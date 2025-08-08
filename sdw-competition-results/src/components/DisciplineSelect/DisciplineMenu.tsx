import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Menu, MenuItem, Typography, Stack, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { t } from 'i18next';
import { DisciplineAvatar } from 'components/DisciplineChip';
import { formatDisciplineList } from 'helpers';
import { useModelConfig } from 'hooks';
import useApiService from 'hooks/useApiService';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EntityType } from 'models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const DisciplineMenu: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id, disciplineId } = useParams();
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const widgetConfig = useWidgetConfig();
  const config = getConfig(EntityType.Competition);
  const baseRoute = `/sdw/widget/competition/${id}`;
  const url = `${config.apiNode}/${id}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data, isLoading } = useQuery({
    queryKey: [id, 'detail'],
    queryFn: () => apiService.fetch(url),
  });

  const dataContent = isLoading ? {} : (data?.data ?? {});
  const displayDisciplines = formatDisciplineList(dataContent?.disciplines ?? []);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisciplineSelect = (option: any) => {
    widgetConfig.onEvent?.('discipline_click', { value: option });
    handleMenuClose(); // Close the menu after the event and navigation (handled by Link)
  };
  const currentDiscipline = displayDisciplines.find((d: any) => d.id === disciplineId);
  return (
    <>
      <Button
        id="discipline-menu-button"
        aria-controls={open ? 'discipline-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        aria-label={currentDiscipline ? currentDiscipline.title : t('general.disciplines')}
        sx={{
          textTransform: 'none',
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
        <Typography
          variant="body1"
          component={'h6'}
          fontWeight={'bold'}
          sx={{ whiteSpace: 'nowrap', px: 2 }}
        >
          {currentDiscipline ? currentDiscipline.title : t('general.disciplines')}
        </Typography>
      </Button>
      <Menu
        id="discipline-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'discipline-menu-button',
          },
        }}
      >
        <MenuItem
          component={Link}
          to={`${baseRoute}`}
          onClick={() => handleDisciplineSelect(null)}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            sx={{
              width: '100%',
              display: 'flex', // Ensure Stack behaves as expected
              alignItems: 'center', // Align items vertically
            }}
          >
            <ArrowBackIosIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: '12px' }} />
            <Typography variant="body1" component={'h3'}>
              {t('general.all-disciplines')}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider />
        {displayDisciplines.map((option) => (
          <MenuItem
            key={option.sportDisciplineId}
            component={Link}
            to={`${baseRoute}/discipline/${option.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              onClick={() => handleDisciplineSelect(option)} // Your custom onClick handler
              sx={{
                width: '100%',
                display: 'flex', // Ensure Stack behaves as expected
                alignItems: 'center', // Align items vertically
              }}
            >
              <DisciplineAvatar code={option.sportDisciplineId} title={option.title} size={20} />
              <Typography variant="body1" component={'span'}>
                {option.title}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
