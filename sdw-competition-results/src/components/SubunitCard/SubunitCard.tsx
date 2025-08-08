import { CompetitorBrackets, ScheduleDisplay } from 'components';
import { MainCard } from 'controls';

type Props = {
  data: any;
  discipline: string;
};

export const SubunitCard = ({ data, discipline }: Props) => {
  if (!data?.competitors || data?.competitors.length == 0) return null;

  return (
    <MainCard
      size="tiny"
      divider={false}
      border={false}
      content={false}
      sx={{ mb: 1 }}
      headerSX={{ px: 0, pt: 2, pb: 1, textAlign: 'left' }}
      secondary={<ScheduleDisplay data={data} inline={true} />}
    >
      <CompetitorBrackets
        discipline={discipline}
        data={data.competitors}
        frames={data.frames}
        officials={data.officials}
      />
    </MainCard>
  );
};
