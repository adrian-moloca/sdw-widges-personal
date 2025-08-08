import { useQuery } from '@tanstack/react-query';
import { ErrorPanel, GenericLoadingPanel, RoundCard } from 'controls';
import { TCardProps } from 'models';
import useApiService from 'hooks/useApiService';
import { CompetitorTable, MediaOverlay, UnitHeader, UnitSubUnits } from 'components';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { WidgetMedia } from 'types/WidgetMedia';

export const UnitDisplay = ({ data: sourceData, discipline }: TCardProps) => {
  const apiService = useApiService();
  const config = useWidgetConfig();
  const matchingMedia: WidgetMedia[] =
    config.media?.filter((m: WidgetMedia) => m.unitId === sourceData.id) || [];
  const url = `/units/${sourceData.id}?languageCode=${config.language}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => apiService.fetch(url),
  });

  const unit = isLoading ? {} : (data?.data ?? {});

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }

  const hasSubunits = unit.subunits && unit.subunits.length > 0;
  const hasCompetitors = unit.competitors && unit.competitors.length > 0;
  if (!hasCompetitors && !hasSubunits) return null;
  if (hasSubunits && !hasCompetitors) {
    return <UnitSubUnits data={unit.subunits} discipline={discipline} />;
  }
  return (
    <RoundCard title={<UnitHeader data={unit} phaseType={sourceData.type} />} key={unit.id}>
      {hasCompetitors && (
        <CompetitorTable
          discipline={discipline}
          data={unit.competitors}
          officials={unit.officials}
        />
      )}
      {hasSubunits && <UnitSubUnits data={unit.subunits} discipline={discipline} />}
      {matchingMedia.length > 0 &&
        matchingMedia.map((media) => (
          <MediaOverlay
            key={media.id}
            media={media}
            onClick={(media) => {
              config.onEvent?.('media_click', { media });
            }}
          />
        ))}
    </RoundCard>
  );
};
