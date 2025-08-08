import { TabContext, TabPanel } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { MenuLinkButton } from 'components';
import { lazyWithSuspense } from 'controls/Loadable/Loadable';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { lazy } from 'react';
import { useParams } from 'react-router-dom';

export const ValidCompetitionTabs = ['schedule', 'medals', 'disciplines', 'participants'];
interface CompetitionNavigationProps {
  competition: any;
  baseRoute: string;
  value: string;
}
export const CompetitionNavigation: React.FC<CompetitionNavigationProps> = ({
  competition,
  value,
  baseRoute,
}) => {
  const { disciplineId } = useParams();
  const widgetConfig = useWidgetConfig();
  const DisciplineSelector = lazy(() => import('components/DisciplineSelector'));
  const CompetitionSchedule = lazy(() => import('components/CompetitionSchedule'));
  const CompetitionAwards = lazy(() => import('components/CompetitionAwards'));
  const CompetitionParticipants = lazy(() => import('components/CompetitionParticipants'));
  const tabConfig = [
    {
      key: 'disciplines',
      label: t('general.disciplines'),
      disabled: false,
      component: lazyWithSuspense(DisciplineSelector, { data: competition }),
    },
    {
      key: 'schedule',
      label: t('general.schedule'),
      disabled: widgetConfig.visibility?.disableCompetitionSchedule,
      component: lazyWithSuspense(CompetitionSchedule, {}),
    },
    {
      key: 'medals',
      label: t('general.awards'),
      disabled: widgetConfig.visibility?.disableCompetitionMedals,
      component: lazyWithSuspense(CompetitionAwards, {}),
    },
    {
      key: 'participants',
      label: t('general.participants'),
      disabled: widgetConfig.visibility?.disableCompetitionParticipants,
      component: lazyWithSuspense(CompetitionParticipants, {}),
    },
  ];

  const visibleTabs = tabConfig.filter((tab) => !tab.disabled);
  if ((visibleTabs.length <= 1 && visibleTabs[0]?.key === 'disciplines') || disciplineId) {
    return (
      <Box sx={{ mt: 4 }}>
        <>{lazyWithSuspense(DisciplineSelector, { data: competition })}</>
      </Box>
    );
  }

  return (
    <>
      <Stack direction={'row'} sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, mt: 2 }}>
        {visibleTabs.map(({ key, label }) => (
          <MenuLinkButton
            key={key}
            label={label}
            selected={value === key}
            to={`${baseRoute}/${key}`}
          />
        ))}
      </Stack>
      <TabContext value={value}>
        {visibleTabs.map(({ key, component }) => (
          <TabPanel key={key} value={key} sx={{ py: 4, px: 0 }}>
            {component}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
};
