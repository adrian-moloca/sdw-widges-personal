import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { GenericLoadingPanel } from 'controls/GenericLoadingPanel';
import { ErrorPanel } from 'controls/ErrorPanel';
import { Alert, useMediaQuery, useTheme } from '@mui/material';
import useApiService from 'hooks/useApiService';
import { useQuery } from '@tanstack/react-query';
import { useModelConfig } from 'hooks/useModelConfig';
import { EntityType, MasterData } from 'models';
import { EventBracketsDisplayBuilder, ResultsBuilder } from 'components';
import { ROUNDS } from 'config';
import { getRoundTitle, processResults } from 'helpers';
import { ButtonTab } from 'controls';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { useStoreCache } from 'hooks';

export interface IProps {
  competitionData: any;
  id: string;
}
export const EventRounds: React.FC<IProps> = ({ competitionData, id }: IProps) => {
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const widgetConfig = useWidgetConfig();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { dataInfo } = useStoreCache();
  const config = getConfig(EntityType.Event);
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    widgetConfig.onEvent?.('tab_change', {
      value: newValue,
      entityType: config.display,
      entityId: id,
    });
    setValue(newValue);
  };
  useEffect(() => setValue(0), [id]);
  const url = `${config.apiNode}/${id}/rounds?languageCode=${widgetConfig.language}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [id, 'rounds'],
    queryFn: () => apiService.fetch(url),
  });

  const dataContent = isLoading ? [] : (data?.data ?? []);

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }

  if (dataContent.length === 0 || !dataContent?.rounds || dataContent?.rounds.length === 0) {
    return (
      <Alert severity="info">
        {t('message.notDataAvailable').replace('{0}', t('general.rounds'))}
      </Alert>
    );
  }

  const displayResults = processResults(dataContent);
  const numRounds = displayResults.length ?? 0;
  const disciplineCode = competitionData.discipline?.code ?? competitionData.sportDisciplineId;
  const hasBrackets =
    displayResults.filter((x: any) => x.stageType === ROUNDS.BRACKETS_TYPE).length > 0;

  if (numRounds === 1 && !hasBrackets) {
    return (
      <ResultsBuilder
        data={displayResults[0]}
        rounds={dataContent.rounds}
        discipline={disciplineCode}
      />
    );
  }

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        variant={isMobile ? 'scrollable' : 'standard'}
        allowScrollButtonsMobile
        aria-label={t('general.rounds')}
        sx={{ mt: 1, '.MuiTabs-indicator': { backgroundColor: 'transparent' } }}
      >
        {displayResults?.map((row: any, i: number) => (
          <ButtonTab
            key={row.id}
            label={getRoundTitle(
              row,
              dataInfo[MasterData.RoundType],
              dataInfo[MasterData.StageType]
            )}
            value={i}
          />
        ))}
        {hasBrackets && <ButtonTab label={t('general.brackets')} value={numRounds} />}
      </TabList>
      {displayResults?.map((row: any, i: number) => (
        <TabPanel key={`${row.id}_content`} value={i} sx={{ p: 0, pt: 4 }}>
          <ResultsBuilder data={row} rounds={dataContent.rounds} discipline={disciplineCode} />
        </TabPanel>
      ))}
      {hasBrackets && (
        <TabPanel key={`${ROUNDS.BRACKETS_TYPE}_content`} value={numRounds} sx={{ p: 0 }}>
          <EventBracketsDisplayBuilder id={id} />
        </TabPanel>
      )}
    </TabContext>
  );
};
