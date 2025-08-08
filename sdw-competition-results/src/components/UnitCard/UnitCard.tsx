import { RoundCard } from 'controls';
import {
  CompetitorBrackets,
  CompetitorTable,
  getScheduleDate,
  MediaCatalog,
  ScheduleDisplay,
  UnitHeader,
  UnitSubUnits,
} from 'components';
import { uniqBy } from 'lodash';
import { useResults } from 'hooks';

type Props = {
  data: any;
  discipline: string;
  phaseType?: string;
};

export const UnitCard = ({ data, discipline, phaseType }: Props) => {
  const { supportsBrackets } = useResults();
  const hasSubunits = data?.subunits && data.subunits.length > 0;
  const hasCompetitors = data?.competitors && data.competitors.length > 0;
  const formatCompetitors = uniqBy(data?.competitors ? data.competitors : [], 'id');
  const noCompetitors = formatCompetitors?.length;
  if (!hasCompetitors && !hasSubunits) return null;

  if (hasSubunits && !hasCompetitors) {
    return <UnitSubUnits data={data.subunits} discipline={discipline} />;
  }
  if (noCompetitors > 2 || !supportsBrackets(discipline)) {
    return (
      <RoundCard
        title={<UnitHeader data={data} phaseType={phaseType} />}
        secondary={<ScheduleDisplay data={data} />}
      >
        <CompetitorTable
          discipline={discipline}
          data={formatCompetitors}
          officials={data.officials}
        />
        {hasSubunits && <UnitSubUnits data={data.subunits} discipline={discipline} />}
        <MediaCatalog id={data?.id} />
      </RoundCard>
    );
  }

  return (
    <RoundCard title={getScheduleDate(data)} transparent={true}>
      <CompetitorBrackets
        roundData={data}
        discipline={discipline}
        data={formatCompetitors}
        frames={data.frames}
        officials={data.officials}
      />
      {hasSubunits && <UnitSubUnits data={data.subunits} discipline={discipline} />}
    </RoundCard>
  );
};
