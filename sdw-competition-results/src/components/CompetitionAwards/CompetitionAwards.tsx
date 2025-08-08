import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import { AwardAthleteChart, AwardByNoc, AwardDisciplineChart, AwardTeamChart } from 'components';
import { ButtonTab, GenericLoadingPanel } from 'controls';
import { ErrorPanel } from 'controls/ErrorPanel/ErrorPanel';
import { useModelConfig } from 'hooks';
import useApiService from 'hooks/useApiService';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EntityType } from 'models';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const CompetitionAwards: React.FC = () => {
  const { id } = useParams();
  const widgetConfig = useWidgetConfig();
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const config = getConfig(EntityType.Competition);
  const [value, setValue] = useState(0);
  const url = `${config.apiNode}/${id}/awards?languageCode=${widgetConfig.language}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [id, 'awards', widgetConfig.language],
    queryFn: () => apiService.fetch(url),
  });
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    widgetConfig.onEvent?.('medal_tab_change', {
      value: newValue,
      entityType: config.display,
      entityId: id,
    });
    setValue(newValue);
  };

  if (isLoading) return <GenericLoadingPanel loading={true} />;

  if (error) return <ErrorPanel error={error} />;
  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label={t('general.rounds')}
        sx={{ '.MuiTabs-indicator': { backgroundColor: 'transparent' }, pt: 2 }}
      >
        <ButtonTab label={t('charts.medals-by-noc')} value={0} />
        <ButtonTab label={t('charts.medals-by-discipline')} value={1} />
        <ButtonTab label={t('charts.medals-by-athlete')} value={2} />
        <ButtonTab label={t('charts.medals-by-team')} value={3} />
      </TabList>
      <TabPanel value={0} sx={{ px: 0, pt: 1 }}>
        <AwardByNoc id={id!} />
      </TabPanel>
      <TabPanel value={1} sx={{ px: 0, pt: 1 }}>
        <AwardDisciplineChart data={data} />
      </TabPanel>
      <TabPanel value={2} sx={{ px: 0, pt: 1 }}>
        <AwardAthleteChart data={data} />
      </TabPanel>
      <TabPanel value={3} sx={{ px: 0, pt: 1 }}>
        <AwardTeamChart data={data} />
      </TabPanel>
    </TabContext>
  );
};
