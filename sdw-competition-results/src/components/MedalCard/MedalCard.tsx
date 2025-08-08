import { Stack, Typography } from '@mui/material';
import { KpiDataProps, MedalType } from 'models';
import { MedalIcon } from './MedalIcon';

type Props = {
  data: KpiDataProps;
  field: MedalType;
};

export const MedalCard = ({ data, field }: Props) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
      <MedalIcon field={field} />
      <Typography variant="h5" sx={{ lineHeight: 1 }}>
        {data.value}
      </Typography>
    </Stack>
  );
};
