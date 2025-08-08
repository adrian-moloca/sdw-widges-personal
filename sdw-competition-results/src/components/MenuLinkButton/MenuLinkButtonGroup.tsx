import { Button, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { LinkButtonProps, MenuLinkButtonGroupProps } from './types';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { t } from 'i18next';
export const MenuLinkButtonGroup: React.FC<MenuLinkButtonGroupProps> = ({
  buttons,
  selectedButton,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const currentButton = buttons.find((button) => button.selected);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        id="round-menu-button"
        aria-controls={open ? 'round-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        aria-label={currentButton?.label ?? t('general.rankings')}
        sx={{
          textTransform: 'none',
          padding: theme.spacing(1, 4),
          justifyContent: 'space-between',
          color: theme.palette.text.primary,
          borderRadius: '20px',
          minWidth: 0,
          flexShrink: 1,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: theme.palette.grey[400],
          width: isMobile ? '100%' : 'auto',
          '&.Mui-focusVisible': {
            backgroundColor: theme.palette.primary.light,
          },
        }}
      >
        <Typography variant="body1" component={'h6'} sx={{ whiteSpace: 'nowrap' }}>
          {currentButton?.label ?? t('general.rankings')}
        </Typography>
      </Button>
      <Menu
        id="round-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'round-menu-button',
          },
        }}
      >
        {buttons.map((option: LinkButtonProps) => (
          <MenuItem
            key={option.label}
            component={Link}
            to={option.to}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Typography variant="body1" component={'h3'}>
                {option.label}
              </Typography>
              {selectedButton === option.label && (
                <DoneIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: '12px' }} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
