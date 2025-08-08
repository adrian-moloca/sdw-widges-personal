import { RadarChartPro } from '@mui/x-charts-pro';
import uniq from 'lodash/uniq';
import { chunkWithMinSize } from 'helpers';
import { Grid } from '@mui/material';
import { ChartErrorBoundary } from 'controls';
import { UnifiedStat } from 'models';
import { unifyStats } from './utils';

type Props = {
  data: Array<UnifiedStat>;
};

const getCompetitorSeries = (competitorNames: string[], chunk: any[]) => {
  return competitorNames.map((name) => ({
    label: name,
    fillArea: false,
    hideMark: false,
    data: chunk.map((stat) => {
      const match = stat.competitors.find((c: any) => c.name === name);
      const value = match?.value ?? 0;
      return value < 0 ? 0 : value;
    }),
  }));
};

export const CompetitorStatsCharts = ({ data }: Props) => {
  if (!data) return null;

  const stats = unifyStats(data);
  if (!stats || stats.length === 0) return null;

  const validStats = stats.filter((stat) =>
    stat.competitors.some((c) => {
      const val = c.value;
      return val && val !== 0;
    })
  );

  const statChunks = chunkWithMinSize(validStats, 8);
  const competitorNames = uniq(stats.flatMap((stat) => stat.competitors.map((c) => c.name)));

  return (
    <>
      {statChunks.map((chunk, index) => {
        const chunkMetrics = chunk.map(
          (stat: UnifiedStat) => stat.competitors[0]?.label ?? stat.code
        );
        const series = getCompetitorSeries(competitorNames, chunk);

        return (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <ChartErrorBoundary name={`radar-chart-${index}`}>
              <RadarChartPro
                height={300}
                radar={{
                  metrics: chunkMetrics,
                }}
                series={series}
              />
            </ChartErrorBoundary>
          </Grid>
        );
      })}
    </>
  );
};
