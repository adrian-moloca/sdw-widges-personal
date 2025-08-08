import { useTheme } from '@mui/material';
import { DisciplineAvatar } from 'components/DisciplineChip';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface EventAvatarProps {
  event: any;
}
export const EventAvatar: React.FC<EventAvatarProps> = ({ event }) => {
  const widgetConfig = useWidgetConfig();
  const theme = useTheme();
  if (!widgetConfig.visibility?.disableHeader) {
    return (
      <DisciplineAvatar
        code={event.discipline.code}
        title={event.discipline.title}
        size={120}
        variant="circular"
        sx={{ p: 4, background: theme.palette.grey[100] }}
      />
    );
  }
  return null;
};
