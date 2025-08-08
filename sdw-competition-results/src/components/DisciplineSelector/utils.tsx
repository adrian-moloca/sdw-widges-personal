import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { alpha, Stack, styled, Typography } from '@mui/material';
import { t } from 'i18next';
import { AwardParticipantChip } from 'components/AwardCardMedal';
import { ScheduleDisplay } from 'components/ScheduleDisplay';
import { customGridClasses, StripedDataGridProps } from 'controls';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import sortBy from 'lodash/sortBy';
import { Link } from 'react-router-dom';
export const getEventColumns = (
  baseRoute: string,
  showMedals: boolean,
  onClick: (event: any) => void
): GridColDef[] => {
  const awardOrder: Record<string, number> = {
    AWSB$ME_GOLD: 1,
    AWSB$GOLD: 1,
    AWSB$ME_SILVER: 2,
    AWSB$SILVER: 2,
    AWSB$ME_BRONZE: 3,
    AWSB$BRONZE: 3,
  };
  return [
    {
      field: 'title',
      headerName: t('general.event'),
      flex: 1,
      minWidth: 270,
      renderCell: (params: any) => {
        const event = params.row;
        const link = `${baseRoute}/event/${event.id}`;
        return (
          <Link
            to={link}
            onClick={() => onClick(event)}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <Stack alignItems={'flex-start'} sx={{ pl: 4 }}>
              <Typography
                variant="subtitle1"
                component={'h4'}
                fontWeight={'bold'}
                whiteSpace={'wrap'}
              >
                {event.display}
              </Typography>
              <ScheduleDisplay data={params.row} sx={{ color: 'text.secondary' }} />
              <Link to={`${baseRoute}/event/${event.id}/replay`} style={{ textDecoration: 'none' }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    mt: 2,
                    '&:hover': {
                      textDecoration: 'underline',
                      textDecorationStyle: 'dotted',
                      textUnderlineOffset: '4px',
                    },
                  }}
                >
                  <OndemandVideoIcon fontSize="small" color="primary" />
                  <Typography variant="body1" color="primary">
                    {t('general.watch-replay')}
                  </Typography>
                </Stack>
              </Link>
            </Stack>
          </Link>
        );
      },
    },
    ...(showMedals
      ? [
          {
            field: 'awards',
            headerName: t('general.awards'),
            flex: 1,
            renderCell: (params: any) => {
              const sortedRecords = sortBy(
                params.row.awards,
                (p: any) => awardOrder[p.subClass ?? 'AWSB$ME_BRONZE'] ?? 99
              );
              const event = params.row;
              const link = `${baseRoute}/event/${event.id}`;
              return (
                <Link
                  to={link}
                  onClick={() => onClick(event)}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    width: '100%',
                  }}
                >
                  <Stack>
                    {sortedRecords.map((award: any, index: number) => (
                      <AwardParticipantChip key={`${index}${award.subClass}`} data={award} />
                    ))}
                  </Stack>
                </Link>
              );
            },
            sortable: false,
            filterable: false,
          },
        ]
      : []),
  ].filter(Boolean);
};

export const EventDataGrid = styled(DataGridPro, {
  shouldForwardProp: (prop) => prop !== 'fontSize', // Avoid passing fontSize to DOM
})<StripedDataGridProps>(({ theme, fontSize }) => ({
  '& .MuiDataGrid-columnHeader': {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: fontSize ?? theme.typography.body1.fontSize,
    fontWeight: 600,
  },
  border: 'none',
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '&.MuiDataGrid-filler': {
    background: theme.palette.grey[900],
    ...theme.applyStyles('dark', {
      borderRightColor: theme.palette.grey[800],
    }),
    color: theme.palette.common.white,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderBottomColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-cell': {
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: fontSize ?? theme.typography.body1.fontSize,
    display: 'flex',
    alignItems: 'center', // vertical center
    justifyContent: 'flex-start', // horizontal left
    paddingTop: '8px!important',
    paddingBottom: '8px!important',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  [`& .${customGridClasses.hoveredRow}`]: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      0.1 + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
    ),
  },
  [`& .${customGridClasses.hoveredCol}`]: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      0.2 + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
    ),
  },
}));
