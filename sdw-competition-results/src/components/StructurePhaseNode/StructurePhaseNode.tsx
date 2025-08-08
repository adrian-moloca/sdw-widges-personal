import { Typography } from '@mui/material';
import { MainCard } from 'controls';
import { getRoundTitle, normalizeTitle } from 'helpers';
import { TypographyLink } from 'components';
import { formatConfig } from 'config';
import dayjs from 'dayjs';
import { useStoreCache } from 'hooks/useStoreCache';
import { MasterData } from 'models/master-data.model';

type Props = {
  data: any;
  competitionId: string;
  disciplineId: string;
  eventId: string;
};
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const StructurePhaseNode = ({ data, competitionId, disciplineId, eventId }: Props) => {
  const { dataInfo } = useStoreCache();
  const title = getRoundTitle(data, dataInfo[MasterData.RoundType], dataInfo[MasterData.StageType]);
  const baseRoute = `/sdw/widget/competition/${competitionId}/discipline/${disciplineId}/event/${eventId}?category=results&round=${slugify(title)}`;
  return (
    <MainCard
      content={false}
      border={false}
      divider={false}
      title={<TypographyLink route={baseRoute} value={normalizeTitle(data.title)} />}
      subHeader={
        <>
          {(data.start || data.end) && (
            <Typography variant="body2" color="text.secondary" lineHeight={1.1}>
              {dayjs(data.start.date).format(formatConfig.dayDateFormat).toUpperCase()}
              {' - '}
              {data.end && dayjs(data.end.date).format(formatConfig.dayDateFormat).toUpperCase()}
            </Typography>
          )}
        </>
      }
    />
  );
};
