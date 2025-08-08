import { Card, styled } from '@mui/material';
import { olympicsDesignColors } from 'theme/colors';
import { layout } from 'theme/layout';

interface StyleMainCardProps {
  border?: boolean;
  fullWidth?: boolean;
  shadow?: boolean;
}
export const StyleMainCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'border', // Avoid passing border to DOM
})<StyleMainCardProps>(({ theme, border, fullWidth, shadow }) => ({
  borderRadius: layout.radius.sm,
  ...(border && {
    border: '1px solid',
    borderColor: theme.palette.grey[800],
    ...theme.applyStyles('dark', {
      borderBottom: `1px solid ${olympicsDesignColors.dark.general.divider}!important`,
    }),
  }),
  ...(fullWidth && {
    width: '100%',
  }),
  ':hover': {
    boxShadow: shadow ? layout.shadows.md : 'inherit',
  },
}));
