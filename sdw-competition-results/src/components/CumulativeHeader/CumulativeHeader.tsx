import { Chip, Stack, Typography } from '@mui/material';
import { TypographyLink } from 'components';
import { useStoreCache } from 'hooks';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { MasterData } from 'models';

type Props = {
  data: any;
};
export const CumulativeHeader = ({ data }: Props) => {
  const { getMasterDataValue } = useStoreCache();
  const config = useWidgetConfig();
  const status = getMasterDataValue(data?.resultStatus, MasterData.ResultStatus)?.value;
  return (
    <Stack direction="row" spacing={2} alignItems={'center'}>
      <Stack>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <TypographyLink
            value={data.title}
            sx={{ lineHeight: 1.1 }}
            typoSize="subtitle1"
            onClick={() => config?.onEvent?.('stage_click', data)}
          />
          {data.resultStatus && (
            <Chip size="small" label={status.toUpperCase()} sx={{ fontWeight: 400 }} />
          )}
        </Stack>
        {data.venue && (
          <Typography variant="body1" lineHeight={1.1} color="text.secondary" sx={{ mb: 0.5 }}>
            {data.venue.title}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
