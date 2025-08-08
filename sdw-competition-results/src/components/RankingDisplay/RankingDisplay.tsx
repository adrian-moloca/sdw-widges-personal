import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { CompetitorTable, PhaseHeader, PhaseUnitsDisplay, ScheduleDisplay } from 'components';
import { ErrorPanel, GenericLoadingPanel, RoundCard } from 'controls';
import useApiService from 'hooks/useApiService';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
  discipline: string;
};

export const RankingDisplay = ({ data: sourceData, discipline }: Props) => {
  const apiService = useApiService();
  const widgetConfig = useWidgetConfig();
  const url = `/phases/${sourceData.id}?languageCode=${widgetConfig.language}`;

  const { data, error, isLoading } = useQuery({
    queryKey: [url, widgetConfig.language],
    queryFn: () => apiService.fetch(url),
  });

  const dataContent = isLoading ? {} : (data?.data ?? {});

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }

  return (
    <Grid container spacing={2}>
      {dataContent.competitors && dataContent.competitors.length > 0 && (
        <Grid size={12}>
          <RoundCard
            title={<PhaseHeader data={dataContent} />}
            secondary={<ScheduleDisplay data={dataContent} />}
          >
            <CompetitorTable data={dataContent.competitors} discipline={discipline} />
          </RoundCard>
        </Grid>
      )}
      <Grid size={12}>
        <PhaseUnitsDisplay
          data={sourceData}
          discipline={discipline}
          link={`${url}/units`}
          showTitle={false}
        />
      </Grid>
    </Grid>
  );
};
