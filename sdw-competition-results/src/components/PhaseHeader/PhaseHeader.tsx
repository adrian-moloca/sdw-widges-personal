import { Avatar, Chip, Stack } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useStoreCache } from 'hooks';
import { MasterData } from 'models';
import { TypographyLink } from 'components';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
};
export const PhaseAvatar = ({ data }: Props) => {
  return (
    <Avatar
      sx={{
        height: 30,
        width: 30,
        bgcolor: pink[600],
        fontSize: '12px',
        fontWeight: 500,
      }}
    >{`P${data.order ?? '0'}`}</Avatar>
  );
};
export const PhaseHeader = ({ data }: Props) => {
  const { getMasterDataValue } = useStoreCache();
  const config = useWidgetConfig();
  const status = getMasterDataValue(data?.resultStatus, MasterData.ResultStatus)?.value ?? '-';
  return (
    <Stack direction="row" spacing={2} alignItems={'center'}>
      <Stack>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <TypographyLink
            value={data.title}
            typoSize="subtitle1"
            sx={{ lineHeight: 1.1 }}
            onClick={() => config?.onEvent?.('phase_click', data)}
          />
          {status && <Chip size="small" label={status.toUpperCase()} sx={{ fontWeight: 400 }} />}
        </Stack>
      </Stack>
    </Stack>
  );
};
