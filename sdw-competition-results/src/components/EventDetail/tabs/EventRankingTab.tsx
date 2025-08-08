import { Alert } from '@mui/material';
import { CompetitorTable } from 'components';
import { t } from 'i18next';
import { IPanelTabProps } from 'models';

export const EventRankingTab = (props: IPanelTabProps) => {
  if (!props.data?.competitors) {
    return (
      <Alert severity="info">
        {t('message.notDataAvailable').replace('{0}', t('general.competitors').toLowerCase())}
      </Alert>
    );
  }
  const disciplineCode = props.data?.discipline?.code ?? props.data.sportDisciplineId;
  return (
    <CompetitorTable data={props.data.competitors} discipline={disciplineCode} ranking={true} />
  );
};
