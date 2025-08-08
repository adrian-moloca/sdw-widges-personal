import { formatConfig } from 'config';
import dayjs from 'dayjs';
import get from 'lodash/get';

export const StartDateChip = (param: { data: any; format?: string }) => {
  let startDate = get(param.data, `startDate`);
  startDate ??= get(param.data, `roundsResult.startDate`);
  startDate ??= get(param.data, `competition.startDate`);
  startDate ??= get(param.data, `recordDate`);
  if (!startDate) return <>-</>;
  return (
    <>
      {dayjs(startDate)
        .format(param.format ?? formatConfig.dayDateFormat)
        .toUpperCase()}
    </>
  );
};
