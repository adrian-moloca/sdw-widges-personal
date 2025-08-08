import { Typography } from '@mui/material';
import { MainCard } from 'controls';
import { normalizeTitle } from 'helpers';

type Props = {
  data: any;
};

export const UnitNode = ({ data }: Props) => {
  return (
    <MainCard
      content={false}
      headerSX={{ p: 0, height: 30 }}
      border={false}
      divider={false}
      title={
        <Typography textAlign={'left'} lineHeight={1.1} fontWeight="bold">
          {normalizeTitle(data.title)}
        </Typography>
      }
    />
  );
};
