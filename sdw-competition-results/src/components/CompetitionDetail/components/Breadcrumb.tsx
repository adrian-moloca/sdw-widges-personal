import { Breadcrumbs, Link as MuiLink } from '@mui/material';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface CompetitionBreadcrumbProps {
  competition: any;
  selectedDiscipline?: any;
  baseRoute: string;
  selectedValue?: string;
}
export const CompetitionBreadcrumb: React.FC<CompetitionBreadcrumbProps> = ({
  competition,
  selectedDiscipline,
  baseRoute,
  selectedValue = 'disciplines',
}) => {
  const widgetConfig = useWidgetConfig();
  if (!widgetConfig.visibility?.disableBreadcrumbsNav) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <MuiLink underline="hover" color="inherit" href={baseRoute}>
          {competition.title}
        </MuiLink>
        {selectedDiscipline ? (
          <MuiLink
            underline="hover"
            color="inherit"
            href={`${baseRoute}/discipline/${selectedDiscipline.id}`}
          >
            {selectedDiscipline.title}
          </MuiLink>
        ) : (
          <MuiLink underline="hover" color="inherit" href={`${baseRoute}/disciplines`}>
            {selectedValue === 'disciplines'
              ? t('general.disciplines')
              : selectedValue === 'schedule'
                ? t('general.schedule')
                : selectedValue === 'medals'
                  ? t('general.awards')
                  : t('general.participants')}
          </MuiLink>
        )}
      </Breadcrumbs>
    );
  }
  return null;
};
