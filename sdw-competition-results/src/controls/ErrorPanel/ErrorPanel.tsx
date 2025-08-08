import { Alert, AlertTitle, Paper, Typography } from '@mui/material';
import { t } from 'i18next';

export interface IErrorPanelProps {
  error: any;
  onClose?: () => void;
}

export const ErrorPanel = (props: IErrorPanelProps): React.ReactElement | null => {
  if (!props.error) return null;
  return (
    <Paper sx={{ p: 1, my: 1 }}>
      <Alert
        severity="error"
        sx={{ py: 2 }}
        onClose={() => {
          if (props.onClose) props.onClose();
        }}
      >
        <AlertTitle>{t('common.errorTitle')}</AlertTitle>
        <Typography variant="body1">{props.error.toString()}</Typography>
      </Alert>
    </Paper>
  );
};
