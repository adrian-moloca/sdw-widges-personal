import { RoundCard } from 'controls';
import { CompetitorBrackets, CompetitorTable, PhaseHeader, ScheduleDisplay } from 'components';
import { TCardProps } from 'models';

export const PhaseCard = ({ data, discipline }: TCardProps) => {
  const noCompetitors = data?.competitors?.length ?? 0;
  if (noCompetitors == 0) return null;

  return (
    <RoundCard
      title={<PhaseHeader data={data} />}
      secondary={<ScheduleDisplay data={data} />}
      transparent={data?.competitors.length === 2}
    >
      {data?.competitors.length > 2 ? (
        <CompetitorTable
          data={data.competitors}
          discipline={discipline}
          officials={data.officials}
        />
      ) : (
        <CompetitorBrackets
          data={data.competitors}
          officials={data.officials}
          discipline={discipline}
          frames={data.frames}
        />
      )}
    </RoundCard>
  );
};
