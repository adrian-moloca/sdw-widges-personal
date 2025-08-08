import { Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { MenuLinkButtonProps } from './types';

export const SubMenuLinkButton: React.FC<MenuLinkButtonProps> = ({ label, to, selected }) => {
  const theme = useTheme();
  return (
    <Button
      id={`menu-link-button-${label}`}
      aria-label={label}
      component={Link}
      to={to}
      variant="outlined"
      color="secondary"
      sx={{
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        textTransform: 'none',
        padding: theme.spacing(2, 4),
        justifyContent: 'flex-start',
        minWidth: 0,
        flexShrink: 1,
        boxShadow: 'none',
        width: 'auto',
        backgroundColor: selected ? theme.palette.grey[300] : 'inherit', // Highlight selected button
        '&:hover': {
          backgroundColor: theme.palette.grey[700], // Hover effect
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.palette.grey[600], // Focus visible
        },
      }}
      endIcon={selected ? <DoneIcon /> : null} // Optional selected indicator
    >
      <Typography variant="body1" component={'h6'} sx={{ whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Button>
  );
};
