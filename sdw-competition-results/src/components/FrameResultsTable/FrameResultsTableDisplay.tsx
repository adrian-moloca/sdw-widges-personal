import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StripedDataGridBase } from 'controls';
import { useFrames } from 'hooks';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  discipline: string;
  frameTable?: any;
  filterType: string;
};

export const FrameResultsTableDisplay = ({ discipline, frameTable, filterType }: Props) => {
  const theme = useTheme();
  const widgetConfig = useWidgetConfig();
  const { getDynamicDataGridData } = useFrames();

  if (!frameTable.pivotTable) return null;
  return Object.keys(frameTable.pivotTable.rows).map((competitor, index: number) => {
    const frames = frameTable.pivotTable.rows[competitor];
    const frameData = getDynamicDataGridData(
      frames,
      frameTable.pivotTable,
      discipline,
      filterType,
      7
    );
    return (
      <Grid container size={12} key={index} spacing={1}>
        {competitor && (
          <Grid size={12}>
            <Typography fontWeight={500}>{competitor}</Typography>
          </Grid>
        )}

        <Grid size={12}>
          <StripedDataGridBase
            rows={frameData.rows}
            fontSize={theme.typography.body1.fontSize}
            columns={frameData.columns}
            getRowId={(row) => row.id}
            disableColumnMenu
            disableRowSelectionOnClick
            density="compact"
            getRowClassName={
              widgetConfig.dataDisplay?.enableStripedTables === true
                ? (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')
                : undefined
            }
            getRowHeight={() => 'auto'}
            hideFooter
          />
        </Grid>
      </Grid>
    );
  });
};
