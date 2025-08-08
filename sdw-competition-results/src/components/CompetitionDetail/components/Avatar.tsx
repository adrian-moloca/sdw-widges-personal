import { Avatar, useMediaQuery } from '@mui/material';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface CompetitionAvatarProps {
  competition: any;
}
export const CompetitionAvatar: React.FC<CompetitionAvatarProps> = ({ competition }) => {
  const widgetConfig = useWidgetConfig();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  if (!widgetConfig.visibility?.disableHeader && competition.logo && !isMobile) {
    return (
      <Avatar
        variant="square"
        src={competition.logo}
        sx={{ height: 130, width: 130 }}
        alt={competition.title}
      />
    );
  }
  return null;
};
