import { TabContext, TabPanel } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import { ErrorPanel, GenericLoadingPanel, lazyWithSuspense, MainCard } from 'controls';
import { useModelConfig } from 'hooks';
import useApiService from 'hooks/useApiService';
import { t } from 'i18next';
import { EntityType, IParameter } from 'models';
import { EventRankingTab } from './tabs/EventRankingTab';
import { EventResultsTab } from './tabs/EventResultsTab';
import {
  AdBanner,
  DisciplineMenu,
  EventSelect,
  MenuLinkButton,
  MenuLinkButtonGroup,
  Seo,
} from 'components';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ButtonGroup, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EventBreadcrumb } from './components/Breadcrumb';
import { EventHeader } from './components/Header';
import { EventAvatar } from './components/Avatar';
import { lazy } from 'react';

const validTabs = ['rankings', 'results', 'awards', 'records', 'stats', 'structure'] as const;
type TabKey = (typeof validTabs)[number];
const defaultTab: TabKey = 'rankings';

export const EventDetail: React.FC = () => {
  const { id, disciplineId, eventId } = useParams();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const widgetConfig = useWidgetConfig();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const tab = searchParams.get('category') as TabKey | null;
  const tabValue = validTabs.includes(tab as TabKey) ? (tab as TabKey) : defaultTab;

  const apiService = useApiService();
  const { getConfig, hasDisciplineRecords } = useModelConfig();
  const config = getConfig(EntityType.Event);

  const EventAwardsTab = lazy(() => import('./tabs/EventAwardsTab'));
  const EventRecordsTab = lazy(() => import('./tabs/EventRecordsTab'));
  const EventStructureBuilder = lazy(() => import('./tabs/EventStructureBuilder'));

  const url = `${config.apiNode}/${eventId}?languageCode=${widgetConfig.language}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [eventId, 'detail'],
    queryFn: () => apiService.fetch(url),
  });
  const dataContent = isLoading ? {} : (data?.data ?? {});

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }
  const parameter: IParameter = { id: eventId!, type: EntityType.Event, display: data.title };
  const disciplineCode = dataContent?.discipline.code;
  const title = `${data.data.discipline.title} - ${data.data.title}`;
  const baseRoute = `/sdw/widget/competition/${id}`;
  const tabItems = [
    ...(!widgetConfig.visibility?.disableRankings
      ? [
          {
            label: 'general.eventRankings',
            value: 'rankings',
            component: <EventRankingTab parameter={parameter} data={dataContent} />,
          },
        ]
      : []),
    ...(!widgetConfig.visibility?.disableResults
      ? [
          {
            label: 'general.results',
            value: 'results',
            component: <EventResultsTab parameter={parameter} data={dataContent} />,
          },
        ]
      : []),
    ...(!widgetConfig.visibility?.disableMedals
      ? [
          {
            label: 'general.awards',
            value: 'awards',
            component: lazyWithSuspense(EventAwardsTab, { parameter, data }),
          },
        ]
      : []),
    ...(hasDisciplineRecords(disciplineCode) && !widgetConfig.visibility?.disableRecords
      ? [
          {
            label: 'general.new-records',
            value: 'records',
            component: lazyWithSuspense(EventRecordsTab, { parameter, data }),
          },
        ]
      : []),
    ...(!widgetConfig.visibility?.disableStructure
      ? [
          {
            label: 'general.structure',
            value: 'structure',
            component: lazyWithSuspense(EventStructureBuilder, { parameter, data }),
          },
        ]
      : []),
  ].filter(Boolean);

  return (
    <main>
      <Seo
        title={`Event ${title}`}
        description={`Details for event ${title}`}
        keywords={['Explore Results', 'Rankings', 'Records']}
      >
        <link
          rel="canonical"
          href={`${window.location.origin}${location.pathname}?category=${tabValue}`}
        />
      </Seo>
      <EventBreadcrumb
        event={dataContent}
        disciplineId={disciplineId}
        baseRoute={baseRoute}
        tab={tabValue}
      />
      <MainCard
        title={<EventHeader event={dataContent} baseRoute={baseRoute} />}
        avatar={<EventAvatar event={dataContent} />}
        border={false}
        headerSX={
          !widgetConfig.visibility?.disableHeader ? { textAlign: 'left', pt: 10, pb: 2 } : {}
        }
        sx={{ px: 2 }}
        divider={false}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          justifyContent={'space-between'}
          sx={{ borderBottom: isMobile ? 0 : 1, borderColor: 'divider' }}
        >
          <ButtonGroup color="secondary" fullWidth={isMobile}>
            {isMobile && (
              <MenuLinkButtonGroup
                buttons={tabItems.map((item) => ({
                  label: t(item.label),
                  to: `${baseRoute}/discipline/${disciplineId}/event/${eventId}?category=${item.value}`,
                  selected: tabValue === item.value,
                }))}
                selectedButton={tabValue}
              />
            )}
            {!isMobile &&
              tabItems.map((item) => (
                <MenuLinkButton
                  key={item.value}
                  label={t(item.label)}
                  selected={tabValue === item.value}
                  to={`${baseRoute}/discipline/${disciplineId}/event/${eventId}?category=${item.value}`}
                />
              ))}
            {!isMobile && !widgetConfig.visibility?.disableSchedule && (
              <MenuLinkButton label={t('general.schedule')} to={`${baseRoute}/schedule`} />
            )}
          </ButtonGroup>
          <Stack direction={isMobile ? 'column' : 'row'} alignItems="center" spacing={1}>
            <EventSelect />
            <DisciplineMenu />
          </Stack>
        </Stack>
        <TabContext value={tabValue}>
          {tabItems.map((item) => (
            <TabPanel key={item.value} value={item.value} sx={{ px: 0, pb: 2, pt: 8 }}>
              {item.component}
            </TabPanel>
          ))}
        </TabContext>
      </MainCard>
      <AdBanner />
    </main>
  );
};
