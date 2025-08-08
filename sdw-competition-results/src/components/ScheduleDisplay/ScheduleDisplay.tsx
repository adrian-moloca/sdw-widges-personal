import get from 'lodash/get';
import { Stack, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Theme } from '@emotion/react';
import { formatConfig } from 'config';

type Props = {
  data: any;
  inline?: boolean;
  children?: React.ReactElement;
  sx?: SxProps<Theme>;
};
export function getScheduleDate(data: any): string | undefined {
  const startDateTime = get(data, 'schedule.startDateTime');
  const startDate = get(data, 'schedule.startDate') ?? get(data, 'startDate');
  if (startDateTime)
    return dayjs(startDateTime).format(formatConfig.dateTimeDateFormat).toUpperCase();
  if (startDate) return dayjs(startDate).format(formatConfig.dayDateFormat).toUpperCase();
  return undefined;
}
export const ScheduleDisplay = ({ data, inline, children, sx }: Props) => {
  const date = getScheduleDate(data);
  if (children)
    return (
      <Stack
        spacing={inline ? 0.5 : 0.3}
        sx={{ alignItems: inline ? 'center' : 'end', ...sx }}
        direction={inline ? 'row' : 'column'}
      >
        {date && (
          <Typography variant="body2" lineHeight={1.1}>
            {date}
          </Typography>
        )}
        {children}
      </Stack>
    );
  if (!date) return null;
  return (
    <Typography variant="body2" lineHeight={1.1} sx={{ ...sx, pr: 4 }}>
      {date}
    </Typography>
  );
};
