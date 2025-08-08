import { useQuery } from '@tanstack/react-query';
import useApiService from 'hooks/useApiService';
import { useModelConfig } from 'hooks';
import { EntityType } from 'models';
import { EventBracketsFlow } from './EventBracketsFlow';
import { GenericLoadingPanel, ErrorPanel } from 'controls';

type Props = {
  id: string;
};

export const EventBracketsDisplayBuilder = ({ id }: Props) => {
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const config = getConfig(EntityType.Event);
  const url = `${config.apiNode}/${id}/brackets`;

  const { data, error, isLoading } = useQuery({
    queryKey: [id, 'brackets'],
    queryFn: () => apiService.fetch(url),
  });
  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }
  return <EventBracketsFlow data={data} />;
};
