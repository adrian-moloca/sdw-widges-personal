import { Breadcrumbs, Link, Typography } from '@mui/material';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface EventBreadcrumbProps {
  event: any;
  disciplineId?: string;
  baseRoute: string;
  tab?: string;
}
export const EventBreadcrumb: React.FC<EventBreadcrumbProps> = ({
  event,
  disciplineId,
  baseRoute,
  tab,
}) => {
  const widgetConfig = useWidgetConfig();
  if (!widgetConfig.visibility?.disableBreadcrumbsNav) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={baseRoute}>
          {event.competition.title}
        </Link>
        <Link underline="hover" color="inherit" href={`${baseRoute}/discipline/${disciplineId}`}>
          {event.discipline.title}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>
          {`${event.title} ${t('general.' + (tab?.trim() ?? 'rankings'))}`}
        </Typography>
      </Breadcrumbs>
    );
  }
  return null;
};
