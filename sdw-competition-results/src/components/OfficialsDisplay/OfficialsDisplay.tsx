import { Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import { useStoreCache } from 'hooks';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { OfficialChip } from 'components';
import { ExtendedCard, StripedDataGridBase } from 'controls';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { MasterData } from 'models';

type Props = {
  data: any;
};

export const OfficialsDisplay = ({ data = [] }: Props) => {
  const widgetConfig = useWidgetConfig();
  const theme = useTheme();

  const { getMasterDataValue } = useStoreCache();
  if (!data.officials || data.officials.length == 0) return null;
  const columns: GridColDef[] = [
    {
      field: 'function',
      headerName: t('general.function'),
      minWidth: 260,
      sortable: true,
      renderCell: (params: GridRenderCellParams) => {
        const value = getMasterDataValue(get(params.row, 'function'), MasterData.Function)?.value;
        return <Typography variant="body1">{value ?? t('general.official')}</Typography>;
      },
    },
    {
      field: 'participationName',
      headerName: t('general.name'),
      minWidth: 400,
      sortable: true,
      flex: 1,
      valueGetter: (_value, row) => row.participationName,
      renderCell: (params: GridRenderCellParams) => (
        <OfficialChip data={params.row} variant="body1" />
      ),
    },
    {
      field: 'gender',
      headerName: t('general.gender'),
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body1">
          {getMasterDataValue(params.value, MasterData.PersonGender)?.value}
        </Typography>
      ),
    },
  ];
  return (
    <ExtendedCard titleText={t('general.juryOfficials')} icon={GavelOutlinedIcon}>
      <StripedDataGridBase
        rows={orderBy(data.officials, 'order')}
        columns={columns}
        fontSize={theme.typography.body1.fontSize}
        getRowId={(row) => row.participationName}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooter
        rowHeight={widgetConfig.dataDisplay?.defaultSecondaryRowHeight ?? 40}
        density="compact"
        getRowClassName={
          widgetConfig.dataDisplay?.enableStripedTables === true
            ? (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')
            : undefined
        }
      />
    </ExtendedCard>
  );
};
