import { Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuLinkButtonProps } from './types';

export const MenuLinkButton: React.FC<MenuLinkButtonProps> = ({ label, to, selected }) => {
  const theme = useTheme();
  return (
    <Button
      id={`menu-link-button-${label}`}
      aria-label={label}
      component={Link}
      to={to}
      sx={{
        borderRadius: 0,
        textTransform: 'none',
        padding: theme.spacing(4, 4),
        justifyContent: 'space-between',
        minWidth: 0,
        flexShrink: 1,
        boxShadow: 'none',
        border: 'none',
        fontSize: theme.typography.subtitle1.fontSize,

        color: theme.palette.text.primary,
        borderBottom: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
        width: 'auto',
        '&.Mui-focusVisible': {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      <Typography variant="subtitle1" component={'h6'} sx={{ whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Button>
  );
};
