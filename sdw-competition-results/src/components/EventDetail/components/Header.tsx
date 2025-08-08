import { Stack, Typography } from '@mui/material';
import { TypographyLink } from 'components/TypographyLink';
import { formatConfig } from 'config';
import dayjs from 'dayjs';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface EventHeaderProps {
  event: any;
  baseRoute: string;
}
export const EventHeader: React.FC<EventHeaderProps> = ({ event, baseRoute }) => {
  const widgetConfig = useWidgetConfig();
  if (!widgetConfig.visibility?.disableHeader) {
    return (
      <Stack spacing={0}>
        <TypographyLink
          textDecorationStyle="solid"
          typoSize={'h3'}
          renderAs={'h1'}
          value={event.competition.title}
          route={baseRoute}
          direct={true}
          sx={{ lineHeight: 1 }}
        />
        <Typography variant={'h1'} component={'h2'} sx={{ lineHeight: 1 }}>
          {`${event.discipline.title} - ${event.title}`}
        </Typography>
        <Typography component={'h3'} sx={{ lineHeight: 1 }}>
          {`${dayjs(event.startDate).format(formatConfig.fullDayDateFormat)} - ${dayjs(event.finishDate).format(formatConfig.fullDayDateFormat)}`}
        </Typography>
      </Stack>
    );
  }
  return null;
};
