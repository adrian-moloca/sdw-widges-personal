import { Typography } from '@mui/material';
import { useResults } from 'hooks';

export const LastRoundChip = (param: { value?: string; short: boolean }) => {
  const { formatLastRound } = useResults();
  const roundName = formatLastRound(param.value, param.short);
  return <Typography>{roundName}</Typography>;
};
