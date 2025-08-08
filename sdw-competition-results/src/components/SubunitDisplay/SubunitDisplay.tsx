import { useQuery } from '@tanstack/react-query';
import { CompetitorTable, ScheduleDisplay, SubunitHeader } from 'components';
import { ErrorPanel, GenericLoadingPanel, RoundCard } from 'controls';
import useApiService from 'hooks/useApiService';

type Props = {
  data: any;
  discipline: string;
};

export const SubunitDisplay = ({ data: sourceData, discipline }: Props) => {
  const apiService = useApiService();
  const url = `subunits/${sourceData.id}`;

  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => apiService.fetch(url),
  });

  const dataContent = isLoading ? {} : (data?.data ?? {});

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }
  return (
    <RoundCard
      title={<SubunitHeader data={dataContent} />}
      secondary={<ScheduleDisplay data={dataContent} />}
    >
      <CompetitorTable
        discipline={discipline}
        data={dataContent.competitors ?? []}
        officials={dataContent.officials}
      />
    </RoundCard>
  );
};
