import { Chip, Stack, Typography } from '@mui/material';
import { MasterData } from 'models';
import { useStoreCache } from 'hooks';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { TypographyLink } from 'components';
import { formatMasterCode } from 'helpers';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';

type Props = {
  data: any;
  phaseType?: string;
};

export const UnitHeader = ({ data, phaseType }: Props) => {
  const { getMasterDataValue } = useStoreCache();
  const config = useWidgetConfig();
  const status = getMasterDataValue(data?.resultStatus, MasterData.ResultStatus)?.value ?? '';
  return (
    <Stack direction="row" spacing={2}>
      <Stack>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <TypographyLink
            value={data.title}
            typoSize="subtitle1"
            sx={{ lineHeight: 1.1 }}
            onClick={() => config?.onEvent?.('unit_click', data)}
          />
          {phaseType && (
            <Chip
              size="small"
              variant="outlined"
              icon={<FiberManualRecord fontSize="small" color={'info'} />}
              label={formatMasterCode(phaseType)}
              sx={{ fontWeight: 400 }}
            />
          )}
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
