import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UnitMatchNavigation } from 'components';
import { ErrorPanel, GenericLoadingPanel, RoundCard } from 'controls';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import useApiService from 'hooks/useApiService';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
  discipline: string;
  showTitle: boolean;
  link: string;
};
export const PhaseUnitsDisplay = ({ data: sourceData, showTitle, discipline, link }: Props) => {
  const apiService = useApiService();
  const widgetConfig = useWidgetConfig();
  const { data, error, isLoading } = useQuery({
    queryKey: [link, widgetConfig.language],
    queryFn: () => {
      const cleanLink = link.replace('?trim=3', '');

      if (!cleanLink.includes('languageCode')) {
        return apiService.fetch(cleanLink + '?languageCode=' + widgetConfig.language);
      }
      return apiService.fetch(cleanLink);
    },
  });

  const dataContent = isLoading ? [] : (data?.data ?? []);
  const units = Array.isArray(dataContent)
    ? dataContent
    : dataContent.units && Array.isArray(dataContent.units)
      ? dataContent.units
      : [];

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }
  const totalUnits = units?.length ?? 0;
  if (totalUnits == 0) return null;

  if (showTitle)
    return (
      <RoundCard
        title={
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant="body1">{`${totalUnits} ${t('general.rounds')}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t('action.open-for-more-details')}
            </Typography>
          </Stack>
        }
        icon={GridViewOutlinedIcon}
      >
        <UnitMatchNavigation
          data={units}
          discipline={discipline}
          phaseType={sourceData.stageType ?? sourceData.phaseType}
        />
      </RoundCard>
    );
  return (
    <UnitMatchNavigation
      data={units}
      discipline={discipline}
      phaseType={sourceData.stageType ?? sourceData.phaseType}
    />
  );
};
