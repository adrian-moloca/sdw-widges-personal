import { Typography } from '@mui/material';
import { TypographyLink } from 'components';
import { formatConfig } from 'config';
import { MainCard } from 'controls';
import dayjs from 'dayjs';
import { useStoreCache } from 'hooks/useStoreCache';
import { MasterData } from 'models';

type Props = {
  data: any;
  competitionId: string;
  disciplineId: string;
};

export const StructureEventNode = ({ data, competitionId, disciplineId }: Props) => {
  const { getMasterDataValue } = useStoreCache();
  const baseRoute = `/sdw/widget/competition/${competitionId}/discipline/${disciplineId}/event/${data.id}`;
  const getEventDetail = (option: any) => {
    if (!option) return '';
    let display = option?.title ?? '';
    if (option.gender) {
      const gender = getMasterDataValue(option.gender, MasterData.SportGender)?.value;
      if (!display.includes(gender)) display = `${display} | ${gender}`;
    }

    if (option.type?.startsWith('ETP-')) {
      const type = getMasterDataValue(option.type, MasterData.EventType)?.value;
      if (!display.includes(type) && !display.includes(type.replace(',', '')))
        display = `${display} (${type})`;
    }

    if (option.type) {
      const type = getMasterDataValue(option.type, MasterData.EventType)?.value;
      if (!display.includes(type) && !display.includes(type.replace(',', '')))
        display = `${display} (${type})`;
    }
    return display;
  };
  return (
    <MainCard
      content={false}
      border={false}
      divider={false}
      title={<TypographyLink route={baseRoute} value={getEventDetail(data)} />}
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
