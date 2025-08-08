import { Link, LinkProps, styled, Tab, TabProps } from '@mui/material';
import { forwardRef } from 'react';

export interface CustomTabProps extends TabProps {
  fontSize?: string;
  to?: string;
  minWidth?: number;
}
export const ButtonTabPrimary = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'fontSize',
})<CustomTabProps>(({ theme, fontSize, minWidth }) => ({
  textTransform: 'none',
  minWidth: minWidth ?? undefined,
  [theme.breakpoints.down('md')]: {
    minWidth: minWidth ?? 50,
    maxWidth: 140,
    whiteSpace: 'wrap',
  },
  fontSize: fontSize ?? theme.typography.body1.fontSize,
  fontFamily: theme.typography.body1.fontFamily,
  marginRight: theme.spacing(0.5),
}));

export const TabLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));
export const ButtonTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'fontSize',
})<CustomTabProps>(({ theme, fontSize, minWidth }) => ({
  lineHeight: '1.1',
  borderRadius: '20px',
  padding: '6px 16px!important',
  textTransform: 'none',
  marginRight: theme.spacing(1),
  minHeight: 30,
  [theme.breakpoints.up('sm')]: {
    minWidth: minWidth ?? 140,
  },
  [theme.breakpoints.down('md')]: {
    minWidth: minWidth ?? 50,
    padding: '8px 4px',
  },
  fontWeight: 400,
  fontSize: fontSize ?? theme.typography.body1.fontSize,
  fontFamily: theme.typography.body1.fontFamily,
  backgroundColor: theme.palette.grey[200],
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  ...theme.applyStyles('dark', {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  }),
  '&.Mui-selected': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[700],
  },
  '&:not(.Mui-selected):hover': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700],
    }),
  },
}));
