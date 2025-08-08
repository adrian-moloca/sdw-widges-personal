import { Stack, Typography } from '@mui/material';
import { TypographyLink } from 'components/TypographyLink';
import { formatConfig } from 'config';
import dayjs from 'dayjs';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface CompetitionHeaderProps {
  competition: any;
  discipline?: any;
  baseRoute: string;
}
export const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  competition,
  discipline,
  baseRoute,
}) => {
  const widgetConfig = useWidgetConfig();
  if (!widgetConfig.visibility?.disableHeader) {
    if (discipline) {
      return (
        <Stack spacing={1}>
          <TypographyLink
            textDecorationStyle="solid"
            typoSize={'h3'}
            renderAs={'h1'}
            value={competition.title}
            route={baseRoute}
            direct={true}
            sx={{ lineHeight: 1 }}
          />
          <TypographyLink
            textDecorationStyle="solid"
            typoSize={'h1'}
            renderAs={'h2'}
            value={discipline.title}
            route={`${baseRoute}/discipline/${discipline.id}`}
            direct={true}
            sx={{ lineHeight: 1 }}
          />
          <Typography variant="body1" component={'h3'} sx={{ lineHeight: 1 }}>
            {`${dayjs(competition.startDate).format(formatConfig.fullDayDateFormat)} - ${dayjs(competition.finishDate).format(formatConfig.fullDayDateFormat)}`}
          </Typography>
        </Stack>
      );
    }
    return (
      <Stack>
        <TypographyLink
          textDecorationStyle="solid"
          typoSize={'h1'}
          renderAs={'h1'}
          value={competition.title}
          route={baseRoute}
          direct={true}
          sx={{ lineHeight: 1 }}
        />
        <Typography variant="body1" component={'h3'} sx={{ lineHeight: 1 }}>
          {`${dayjs(competition.startDate).format(formatConfig.fullDayDateFormat)} - ${dayjs(competition.finishDate).format(formatConfig.fullDayDateFormat)}`}
        </Typography>
      </Stack>
    );
  }
  return null;
};
