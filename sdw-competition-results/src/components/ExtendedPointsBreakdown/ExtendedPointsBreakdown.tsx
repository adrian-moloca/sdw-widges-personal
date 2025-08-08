import { Grid, useTheme } from '@mui/material';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import get from 'lodash/get';
import { getPointsBreakdownTableData } from './utils';
import { PointsBreakdownChart } from './PointsBreakdownChart';
import { ExtendedCard, StripedDataGridBase } from 'controls';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
};

export const ExtendedPointsBreakdown = ({ data }: Props) => {
  const theme = useTheme();
  const widgetConfig = useWidgetConfig();
  const pointsBreakdown =
    get(data, 'result.extensions.pointsBreakdown') ?? get(data, 'result.extensions.scoreBreakdown');
  if (!pointsBreakdown) return null;
  const tableData = getPointsBreakdownTableData(pointsBreakdown);
  return (
    <Grid size={12}>
      <ExtendedCard titleText={pointsBreakdown.title} icon={ScoreboardOutlinedIcon}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <StripedDataGridBase
              rows={tableData.rows}
              fontSize={theme.typography.body1.fontSize}
              getRowId={(row) => row.code}
              columns={tableData.columns}
              disableColumnMenu
              disableRowSelectionOnClick
              density="compact"
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              rowHeight={widgetConfig.dataDisplay?.defaultSecondaryRowHeight ?? 40}
              hideFooter
            />
          </Grid>
        </Grid>
        <PointsBreakdownChart data={pointsBreakdown} />
      </ExtendedCard>
    </Grid>
  );
};
