import { Typography } from '@mui/material';
import { MainCard } from 'controls';
import { getRoundTitle, normalizeTitle } from 'helpers';
import { MedalAvatarMap, TypographyLink } from 'components';
import { formatConfig } from 'config';
import dayjs from 'dayjs';
import { useStoreCache } from 'hooks';
import { MasterData } from 'models/master-data.model';

type Props = {
  data: any;
  allData: any[];
  phase: any;
  competitionId: string;
  disciplineId: string;
  eventId: string;
};

function findMinMaxDates(data: any[]) {
  if (!data || data.length === 0) {
    return { minDate: null, maxDate: null };
  }
  const dayjsObjects = data
    .filter((item) => item.start?.datetime)
    .map((item) => dayjs(item.start?.datetime));
  if (dayjsObjects.length === 0) {
    return { minDate: null, maxDate: null };
  }
  let minDate = dayjsObjects[0];
  let maxDate = dayjsObjects[0];
  for (let i = 1; i < dayjsObjects.length; i++) {
    const currentDayjs = dayjsObjects[i];

    if (currentDayjs.isBefore(minDate)) {
      minDate = currentDayjs;
    }

    if (currentDayjs.isAfter(maxDate)) {
      maxDate = currentDayjs;
    }
  }

  return { minDate, maxDate };
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const StructureUnitNode = ({
  data,
  competitionId,
  disciplineId,
  eventId,
  phase,
  allData,
}: Props) => {
  const { dataInfo } = useStoreCache();
  const title = getRoundTitle(
    phase,
    dataInfo[MasterData.RoundType],
    dataInfo[MasterData.StageType]
  );
  const baseRoute = `/sdw/widget/competition/${competitionId}/discipline/${disciplineId}/event/${eventId}/unit/${data.id}?category=results&round=${slugify(title)}`;
  const isGolden =
    data.title.toLowerCase().includes('gold') || data.title.toLowerCase().includes('big final');
  const isBronze =
    data.title.toLowerCase().includes('bronze') || data.title.toLowerCase().includes('small final');
  const { minDate, maxDate } = findMinMaxDates(allData);
  return (
    <MainCard
      content={false}
      border={false}
      divider={false}
      avatar={
        <>
          {isGolden && <>{MedalAvatarMap.golden(26)}</>}
          {isBronze && <>{MedalAvatarMap.bronze(26)}</>}
        </>
      }
      title={<TypographyLink route={baseRoute} value={normalizeTitle(data.title)} />}
      subHeader={
        <>
          {(minDate || maxDate) && (
            <Typography variant="body2" color="text.secondary" lineHeight={1.1}>
              {dayjs(minDate).format(formatConfig.dayDateFormat).toUpperCase()}
              {' - '}
              {dayjs(maxDate).format(formatConfig.dayDateFormat).toUpperCase()}
            </Typography>
          )}
        </>
      }
    />
  );
};
