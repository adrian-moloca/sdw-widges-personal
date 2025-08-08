import { Avatar, Chip, Stack, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { TypographyLink } from 'components';
import { getScheduleDate } from 'components/ScheduleDisplay';
import { useStoreCache } from 'hooks';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { MasterData } from 'models';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
type Props = {
  data: any;
};
export const PoolAvatar = ({ data }: Props) => {
  return (
    <Avatar
      sx={{
        height: 30,
        width: 30,
        bgcolor: purple[600],
        fontSize: '12px',
        fontWeight: 500,
      }}
    >{`P${data.order ?? '0'}`}</Avatar>
  );
};
export const PoolHeader = ({ data }: Props) => {
  const { getMasterDataValue } = useStoreCache();
  const config = useWidgetConfig();
  const status =
    getMasterDataValue(data?.resultStatus ?? 'RCST$OFFICIAL', MasterData.ResultStatus)?.value ??
    '-';
  const date = getScheduleDate(data);
  return (
    <Stack direction="row" spacing={2} alignItems={'center'}>
      <Stack>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <TypographyLink
            value={data.title}
            typoSize="subtitle1"
            sx={{ lineHeight: 1.1 }}
            onClick={() => config?.onEvent?.('stage_click', data)}
          />
          <Chip
            size="small"
            icon={<FiberManualRecord fontSize="small" color={'info'} />}
            variant="outlined"
            label="POOL"
            sx={{ fontWeight: 400 }}
          />
          {status && <Chip size="small" label={status.toUpperCase()} sx={{ fontWeight: 400 }} />}
        </Stack>
        {date && (
          <Typography variant="body2" lineHeight={1.1}>
            {date}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
