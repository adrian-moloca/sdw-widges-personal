import { useEffect, useMemo, useState } from 'react';
import { Alert, Stack, useMediaQuery, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { IPanelTabProps, MasterData } from 'models';
import useApiService from 'hooks/useApiService';
import { useModelConfig, useStoreCache } from 'hooks';
import { ButtonTab, ErrorPanel, GenericLoadingPanel } from 'controls';
import { EventBracketsDisplayBuilder, ResultsBuilder, SubMenuLinkButton } from 'components';
import { getRoundTitle, processResults } from 'helpers';
import { ROUNDS } from 'config';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const EventResultsTab = ({ data: competitionData, parameter }: IPanelTabProps) => {
  const { id, disciplineId, eventId } = useParams();
  const apiService = useApiService();
  const widgetConfig = useWidgetConfig();
  const [searchParams, setSearchParams] = useSearchParams();
  const roundSlugFromUrl = searchParams.get('round') ?? '';
  const { getConfig } = useModelConfig();
  const config = getConfig(parameter.type);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const baseRoute = `/sdw/widget/competition/${id}/discipline/${disciplineId}/event/${eventId}?category=results`;
  const [selectedTabSlug, setSelectedTabSlug] = useState<string>('');
  const { dataInfo } = useStoreCache();
  const url = `${config.apiNode}/${parameter.id}/rounds`;
  const { data, error, isLoading } = useQuery({
    queryKey: [parameter.id, 'rounds'],
    queryFn: () => apiService.fetch(url),
  });

  const dataContent = isLoading ? [] : (data?.data ?? []);
  const displayResults = processResults(dataContent).reverse();
  const numRounds = displayResults.length ?? 0;
  const disciplineCode = competitionData.discipline?.code ?? competitionData.sportDisciplineId;
  const hasBrackets =
    displayResults.filter((x: any) => x.stageType === ROUNDS.BRACKETS_TYPE || x.brackets).length >
    0;
  const roundSlugs = useMemo(() => {
    const baseSlugs: { slug: string; index: number }[] = displayResults.map((row, index) => {
      const title = getRoundTitle(
        row,
        dataInfo[MasterData.RoundType],
        dataInfo[MasterData.StageType]
      );
      return { slug: slugify(title), index };
    });
    return hasBrackets ? [...baseSlugs, { slug: 'brackets', index: numRounds }] : baseSlugs;
  }, [displayResults, hasBrackets, dataInfo[MasterData.RoundType], dataInfo[MasterData.StageType]]);

  // Set initial selected tab based on URL or the first available round/brackets
  useEffect(() => {
    // This effect runs whenever roundSlugs, roundSlugFromUrl, or isLoading changes.
    // We only want to set the selectedTabSlug if we're not loading and have actual slugs.
    if (!isLoading && roundSlugs.length > 0) {
      if (roundSlugFromUrl) {
        // Check if the URL slug is one of our valid slugs
        const matchingSlug = roundSlugs.find((s) => s.slug === roundSlugFromUrl);
        if (matchingSlug) {
          setSelectedTabSlug(matchingSlug.slug);
        } else {
          // If URL slug doesn't match a valid tab, default to the first available slug
          // This prevents the "None of the Tabs' children match with..." error
          setSelectedTabSlug(roundSlugs[0].slug);
        }
      } else {
        // If no round slug in URL, default to the first available slug
        setSelectedTabSlug(roundSlugs[0].slug);
      }
    }
  }, [isLoading, roundSlugFromUrl, roundSlugs]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTabSlug(newValue);
    const slugInfo = roundSlugs.find((slug) => slug.slug === newValue);
    let eventData: any = null;
    if (slugInfo) {
      if (slugInfo.slug === 'brackets') {
        eventData = { type: 'brackets', id: dataContent.id };
      } else {
        eventData = displayResults[slugInfo.index];
      }
    }
    widgetConfig.onEvent?.('round_click', {
      value: newValue,
      data: eventData,
      entityType: config.display,
      entityId: id,
    });
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('round', newValue);
      return newParams;
    });
  };

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

  if (numRounds === 1 && !hasBrackets) {
    return (
      <ResultsBuilder
        data={displayResults[0]}
        rounds={dataContent.rounds}
        discipline={disciplineCode}
      />
    );
  }
  if (selectedTabSlug === '' || roundSlugs.length === 0) {
    return <GenericLoadingPanel loading={true} />;
  }
  return (
    <TabContext value={selectedTabSlug}>
      {isMobile ? (
        <Stack spacing={1} justifyContent={'center'}>
          {displayResults.map((item: any) => {
            const label = getRoundTitle(
              item,
              dataInfo[MasterData.RoundType],
              dataInfo[MasterData.StageType]
            );
            return (
              <SubMenuLinkButton
                key={item.value}
                label={label}
                selected={slugify(label) === roundSlugFromUrl}
                to={`${baseRoute}&round=${slugify(label)}`}
              />
            );
          })}
          {hasBrackets && (
            <SubMenuLinkButton
              label={t('general.brackets')}
              selected={'brackets' === roundSlugFromUrl}
              to={`${baseRoute}&round=brackets`}
            />
          )}
        </Stack>
      ) : (
        <TabList
          onChange={handleChange}
          aria-label={t('general.rounds')}
          sx={{ mt: 2, '.MuiTabs-indicator': { backgroundColor: 'transparent' } }}
        >
          {displayResults?.map((row: any) => {
            const label = getRoundTitle(
              row,
              dataInfo[MasterData.RoundType],
              dataInfo[MasterData.StageType]
            );
            return (
              <ButtonTab
                key={row.id}
                label={label}
                value={slugify(label)}
                component={Link}
                to={`${baseRoute}&round=${slugify(label)}`}
              />
            );
          })}
          {hasBrackets && (
            <ButtonTab
              label={t('general.brackets')}
              value={'brackets'}
              component={Link}
              to={`${baseRoute}&round=brackets`}
            />
          )}
        </TabList>
      )}

      {displayResults?.map((row: any) => {
        const label = getRoundTitle(
          row,
          dataInfo[MasterData.RoundType],
          dataInfo[MasterData.StageType]
        );
        return (
          <TabPanel key={`${row.id}_content`} value={slugify(label)} sx={{ p: 0, pt: 2 }}>
            <ResultsBuilder data={row} rounds={dataContent.rounds} discipline={disciplineCode} />
          </TabPanel>
        );
      })}
      {hasBrackets && (
        <TabPanel key={`${ROUNDS.BRACKETS_TYPE}_content`} value={'brackets'} sx={{ p: 0 }}>
          <EventBracketsDisplayBuilder id={parameter.id} />
        </TabPanel>
      )}
    </TabContext>
  );
};
