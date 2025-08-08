import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Alert, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { cleanTitles, CompetitorTable, PhaseUnitsDisplay } from 'components';
import { ButtonTab, ErrorPanel, GenericLoadingPanel, RoundCard } from 'controls';
import useApiService from 'hooks/useApiService';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  data: any;
  discipline: string;
};

export const PoolsDisplay = ({ data: sourceData, discipline }: Props) => {
  const apiService = useApiService();
  const widgetConfig = useWidgetConfig();
  const url = `/stages/${sourceData.id}?languageCode=${widgetConfig.language}`;
  const { id, disciplineId, eventId, phaseId } = useParams();
  const [searchParams] = useSearchParams();
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => apiService.fetch(url),
  });
  const linkTo = `/sdw/widget/competition/${id}/discipline/${disciplineId}/event/${eventId}/phase/{0}?category=results&round=${searchParams.get('round')}`;
  const dataContent = isLoading ? {} : (data?.data ?? {});
  const [value, setValue] = React.useState(phaseId ?? dataContent.pools?.[0]?.id ?? '0');

  useEffect(() => {
    if (phaseId) {
      setValue(phaseId);
    } else if (!isLoading) {
      setValue(dataContent.pools?.[0]?.id);
    }
  }, [phaseId, dataContent.pools]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }

  if (!dataContent.pools) {
    return (
      <Alert severity="info">
        {t('message.notDataAvailable').replace('{0}', t('general.pool').toLowerCase())}
      </Alert>
    );
  }

  const anyPoolHasCompetitors = dataContent.pools.some(
    (pool: any) => pool.competitors && pool.competitors.length > 0
  );

  if (dataContent.pools.length === 1) {
    return (
      <Grid container spacing={2}>
        {dataContent.pools.map((pool: any) => (
          <Stack key={pool.id} spacing={4}>
            <RoundCard title={pool.displayTitle}>
              <CompetitorTable data={pool.competitors} discipline={discipline} />
            </RoundCard>
            {pool.competitors?.length > 0 && (
              <PhaseUnitsDisplay
                data={pool}
                discipline={discipline}
                link={`phases/${pool.id}/units`}
                showTitle={false}
              />
            )}
          </Stack>
        ))}
        {!anyPoolHasCompetitors && (
          <PhaseUnitsDisplay
            data={sourceData}
            discipline={discipline}
            link={`stages/${sourceData.id}/units`}
            showTitle={true}
          />
        )}
      </Grid>
    );
  }
  const formatPools = cleanTitles(dataContent.pools);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            centered
            sx={{ '.MuiTabs-indicator': { backgroundColor: 'transparent' } }}
          >
            {formatPools.map((pool: any) => (
              <ButtonTab
                key={pool.id}
                value={pool.id}
                label={pool.displayTitle}
                fontSize="body1"
                component={Link}
                minWidth={50}
                to={linkTo.replace('{0}', pool.id)}
              />
            ))}
          </TabList>
          {formatPools.map((pool: any) => (
            <TabPanel key={pool.id} value={pool.id} sx={{ px: 0, py: 0 }}>
              <Stack key={pool.id} spacing={4}>
                <RoundCard title={pool.displayTitle}>
                  <CompetitorTable data={pool.competitors} discipline={discipline} />
                </RoundCard>
                {pool.competitors?.length > 0 && (
                  <PhaseUnitsDisplay
                    data={pool}
                    discipline={discipline}
                    link={`phases/${pool.id}/units`}
                    showTitle={false}
                  />
                )}
              </Stack>
            </TabPanel>
          ))}
        </TabContext>
      </Grid>
      {!anyPoolHasCompetitors && (
        <PhaseUnitsDisplay
          data={sourceData}
          discipline={discipline}
          link={`stages/${sourceData.id}/units`}
          showTitle={true}
        />
      )}
    </Grid>
  );
};
