import { Grid, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { ExtendedCard, StripedDataGridBase } from 'controls';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import dayjs from 'dayjs';
import { useStoreCache } from 'hooks';
import { MasterData } from 'models';
import { OrganisationChip, ParticipantChip } from 'components';
import { formatConfig } from 'config';

type Props = {
  data: any;
  discipline: string;
};

export const ParticipantTable = ({ data, discipline }: Props) => {
  const theme = useTheme();
  const config = useWidgetConfig();
  const { getMasterDataValue } = useStoreCache();
  const rowsWithOrder = data.participants?.map((row: any, index: number) => ({
    ...row,
    metaOrder: index + 1,
  }));
  if (!rowsWithOrder) return null;
  if (rowsWithOrder.length === 0) return null;

  const getMaxTextWidth = (field: string, rows: any[], charWidth = 10, minWidth = 180): number => {
    const maxLength = Math.max(
      ...rows.map((row) => row[field]?.toString().length ?? 0),
      t('general.name').length // include header length
    );
    return Math.max(minWidth, maxLength * charWidth);
  };
  const hasBib = rowsWithOrder.some((row: any) => row.bib != null);
  const columns: GridColDef[] = [
    ...(config.dataDisplay?.calculatedOrder
      ? [{ field: 'order', headerName: '#', width: 50 }]
      : []),
    ...(hasBib
      ? [
          {
            field: 'bib',
            width: discipline == 'SDIS$STK' || discipline == 'SDIS$SSK' ? 150 : 80,
            headerName:
              discipline == 'SDIS$STK' || discipline == 'SDIS$SSK'
                ? t('general.helmet-number')
                : t('general.bib'),
            renderCell: (params: GridRenderCellParams) => (
              <Typography variant="body1">{params.value}</Typography>
            ),
          },
        ]
      : []),
    {
      field: 'organisation',
      headerName: t('general.noc'),
      width: 120,
      valueGetter: (_value, row) => row.organisation.country,
      renderCell: (params: GridRenderCellParams) => (
        <OrganisationChip data={params.row.organisation} extended={false} variant="body1" />
      ),
    },
    {
      field: 'name',
      headerName: t('general.name'),
      flex: 1,
      width: getMaxTextWidth('name', rowsWithOrder),
      valueGetter: (_value, row) => row.name,
      renderCell: (params: GridRenderCellParams) => (
        <ParticipantChip data={params.row} variant="body1" />
      ),
    },
    {
      field: 'gender',
      headerName: t('general.gender'),
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body1">
          {getMasterDataValue(params.value, MasterData.PersonGender)?.value}
        </Typography>
      ),
    },
    {
      field: 'dateOfBirth',
      headerName: t('general.dateOfBirth'),
      align: 'right',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body1">
          {params.value
            ? dayjs(params.value).format(formatConfig.generalDateFormat).toUpperCase()
            : '-'}
        </Typography>
      ),
    },
  ];
  return (
    <Grid size={12}>
      <ExtendedCard titleText={t('general.team-line-up')} icon={WorkspacesIcon}>
        <StripedDataGridBase
          rows={rowsWithOrder}
          fontSize={theme.typography.body1.fontSize}
          getRowId={(row) => row.metaOrder}
          columns={columns}
          disableColumnMenu
          disableRowSelectionOnClick
          density="compact"
          getRowClassName={
            config.dataDisplay?.enableStripedTables === true
              ? (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')
              : undefined
          }
          rowHeight={config.dataDisplay?.defaultSecondaryRowHeight ?? 40}
          hideFooter
        />
      </ExtendedCard>
    </Grid>
  );
};
