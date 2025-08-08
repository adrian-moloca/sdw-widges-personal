import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import orderBy from 'lodash/orderBy';
import { GenericLoadingPanel } from 'controls/GenericLoadingPanel';
import { ErrorPanel } from 'controls/ErrorPanel';
import { RoundCard } from 'controls/RoundCard';
import { ROUNDS } from 'config/sportConfig';
import useApiService from 'hooks/useApiService';
import {
  CompetitorTable,
  CumulativeHeader,
  PhaseDisplay,
  ScheduleDisplay,
  UnitDisplay,
} from 'components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ButtonTab } from 'controls';
import { stripCommonPrefixFromField } from 'helpers';
import { Typography } from '@mui/material';
import { t } from 'i18next';

interface Props {
  data: any;
  discipline: string;
  rounds: Array<any>;
}
export const CumulativeDisplay: React.FC<Props> = ({
  data: sourceData,
  discipline,
  rounds,
}: Props) => {
  const apiService = useApiService();
  const url = `stages/${sourceData.id}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => apiService.fetch(url),
  });
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dataContent = isLoading ? {} : (data?.data ?? {});
  const stageRounds = stripCommonPrefixFromField(
    orderBy(rounds, 'order').filter((x: any) => x.stage && x.stage.id === sourceData.id),
    'title'
  ).filter((x) => x.title);
  const totalUnits = stageRounds.length;
  const hasCompetitors = (dataContent.cumulative?.competitors ?? []) > 0;
  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }
  if (error) {
    return <ErrorPanel error={error} />;
  }

  if (totalUnits == 1 && !hasCompetitors) {
    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <RoundCard>
            {stageRounds.map((row: any) => (
              <React.Fragment key={`${row.id}_content`}>
                {row.usdmType === ROUNDS.PHASE_TYPE ? (
                  <PhaseDisplay data={row} discipline={discipline} />
                ) : (
                  <UnitDisplay data={row} discipline={discipline} showTitle={true} />
                )}
              </React.Fragment>
            ))}
          </RoundCard>
        </Grid>
      </Grid>
    );
  }
  if (totalUnits < 2) {
    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <RoundCard
            title={<CumulativeHeader data={dataContent} />}
            secondary={<ScheduleDisplay data={dataContent} />}
          >
            <CompetitorTable data={dataContent.cumulative?.competitors} discipline={discipline} />
          </RoundCard>
        </Grid>
        <Grid size={12}>
          {stageRounds.map((row: any) => (
            <React.Fragment key={`${row.id}_content`}>
              {row.usdmType === ROUNDS.PHASE_TYPE ? (
                <PhaseDisplay data={row} discipline={discipline} />
              ) : (
                <UnitDisplay data={row} discipline={discipline} showTitle={true} />
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <RoundCard
          title={<CumulativeHeader data={dataContent} />}
          secondary={<ScheduleDisplay data={dataContent} />}
        >
          <CompetitorTable data={dataContent.cumulative?.competitors} discipline={discipline} />
        </RoundCard>
      </Grid>
      <Grid size={12}>
        <Typography variant="h6" sx={{ px: 2, pt: 1 }}>
          {`${totalUnits} ${t('general.rounds')}`}
        </Typography>
        <TabContext value={value}>
          <TabList
            centered
            onChange={handleChange}
            sx={{ '.MuiTabs-indicator': { backgroundColor: 'transparent' } }}
          >
            {stageRounds.map((row: any, index: number) => (
              <ButtonTab key={row.id} value={index} label={row.title} minWidth={50} />
            ))}
          </TabList>
          {stageRounds.map((row: any, index: number) => (
            <TabPanel key={row.id} value={index} sx={{ px: 0, py: 0 }}>
              <React.Fragment key={`${row.id}_content`}>
                {row.usdmType === ROUNDS.PHASE_TYPE ? (
                  <PhaseDisplay data={row} discipline={discipline} />
                ) : (
                  <UnitDisplay data={row} discipline={discipline} showTitle={true} />
                )}
              </React.Fragment>
            </TabPanel>
          ))}
        </TabContext>
      </Grid>
    </Grid>
  );
};
