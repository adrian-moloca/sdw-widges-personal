import Grid from '@mui/material/Grid';
import { RoundCard } from 'controls';
import { CompetitorTable, PhaseHeader, PhaseUnitsDisplay, ScheduleDisplay } from 'components';
import { isNullOrEmpty } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
  discipline: string;
};

export const PhaseDisplay = ({ data, discipline }: Props) => {
  const url = `/phases/${data.id}`;
  const widgetConfig = useWidgetConfig();
  return (
    <Grid container spacing={2}>
      {!isNullOrEmpty(data.competitors) && data.competitors.length > 0 && (
        <Grid size={12}>
          <RoundCard
            title={<PhaseHeader data={data} />}
            secondary={<ScheduleDisplay data={data} />}
          >
            <CompetitorTable data={data.competitors} discipline={discipline} />
          </RoundCard>
        </Grid>
      )}
      <Grid size={12}>
        <PhaseUnitsDisplay
          data={data}
          discipline={discipline}
          link={`${url}/units?languageCode=${widgetConfig.language}`}
          showTitle={false}
        />
      </Grid>
    </Grid>
  );
};
