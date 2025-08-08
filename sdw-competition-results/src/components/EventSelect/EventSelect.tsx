import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Menu, MenuItem, Typography, Stack, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { t } from 'i18next';
import { useStoreCache, useModelConfig } from 'hooks';
import useApiService from 'hooks/useApiService';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EntityType, MasterData } from 'models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { geCountryRegionDisplay } from 'helpers';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DoneIcon from '@mui/icons-material/Done';
import dayjs from 'dayjs';
import { formatConfig } from 'config';

export const EventSelect: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id, disciplineId, eventId } = useParams();
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const widgetConfig = useWidgetConfig();
  const { getMasterDataValue } = useStoreCache();
  const config = getConfig(EntityType.Discipline);
  const baseRoute = `/sdw/widget/competition/${id}/discipline/${disciplineId}`;
  const url = `${config.apiNode}/${disciplineId}?extended=true&languageCode=${widgetConfig.language}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data, isLoading } = useQuery({
    queryKey: [disciplineId, 'detail', widgetConfig.language],
    queryFn: () => apiService.fetch(url),
  });
  const dataContent = isLoading ? {} : (data?.data ?? {});
  const displayEvents = dataContent?.events ?? [];
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEventSelect = (option: any) => {
    widgetConfig.onEvent?.('event_click', { value: option });
    handleMenuClose(); // Close the menu after the event and navigation (handled by Link)
  };
  const getEventDetail = (option: any) => {
    if (!option) return '';

    let display = option?.title ?? '';
    const location = geCountryRegionDisplay(option);

    if (option.gender) {
      const gender = getMasterDataValue(option.gender, MasterData.SportGender)?.value;
      if (!display.includes(gender)) display = `${display} | ${gender}`;
    }

    if (option.type?.startsWith('ETP-')) {
      const type = getMasterDataValue(option.type, MasterData.EventType)?.value;
      if (!display.includes(type) && !display.includes(type.replace(',', '')))
        display = `${display} (${type})`;
    }

    if (option.type) {
      const type = getMasterDataValue(option.type, MasterData.EventType)?.value;
      if (!display.includes(type) && !display.includes(type.replace(',', '')))
        display = `${display} (${type})`;
    }

    if (option.startDate) {
      display = `${display} | ${dayjs(option.startDate).format(formatConfig.dayDateFormat).toUpperCase()}`;
    }

    if (location) {
      display = `${display} | ${option.region}`;
    }

    return display;
  };
  const currentEvent = displayEvents.find((e: any) => e.id === eventId);
  return (
    <>
      <Button
        id="event-menu-button"
        aria-controls={open ? 'event-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        aria-label={currentEvent ? currentEvent.title : t('general.events')}
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
          {currentEvent ? currentEvent.title : t('general.events')}
        </Typography>
      </Button>
      <Menu
        id="event-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'event-menu-button',
          },
        }}
      >
        <MenuItem
          component={Link}
          to={`${baseRoute}`}
          onClick={() => handleEventSelect(null)}
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
              {t('general.all-events')}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider />
        {displayEvents.map((option: any) => (
          <MenuItem
            key={option.id}
            component={Link}
            to={`${baseRoute}/event/${option.id}`}
            onClick={() => handleEventSelect(option)}
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
                {getEventDetail(option)}
              </Typography>
              {eventId === option.id && (
                <DoneIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: '12px' }} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
