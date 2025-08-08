import { Typography } from '@mui/material';
import { MainCard } from 'controls';
import { normalizeTitle } from 'helpers';
import dayjs from 'dayjs';
import { formatConfig } from 'config/sportConfig';
import { TypographyLink } from 'components/TypographyLink';

type Props = {
  data: any;
  competitionId: string;
  disciplineId: string;
  eventId: string;
};

export const StructureStageNode = ({ data, competitionId, disciplineId, eventId }: Props) => {
  const baseRoute = `/sdw/widget/competition/${competitionId}/discipline/${disciplineId}/event/${eventId}?category=results`;
  return (
    <MainCard
      content={false}
      border={false}
      divider={false}
      title={<TypographyLink route={baseRoute} value={normalizeTitle(data.title)} />}
      subHeader={
        <Typography variant="body2" color="text.secondary" lineHeight={1.1}>
          {dayjs(data.start.date).format(formatConfig.dayDateFormat).toUpperCase()}
          {' - '}
          {dayjs(data.end.date).format(formatConfig.dayDateFormat).toUpperCase()}
        </Typography>
      }
    />
  );
};
