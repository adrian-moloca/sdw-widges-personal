import { useQuery } from '@tanstack/react-query';
import { Seo } from 'components';
import { ErrorPanel, GenericLoadingPanel, MainCard } from 'controls';
import { useModelConfig } from 'hooks';
import useApiService from 'hooks/useApiService';
import { EntityType } from 'models';
import { useLocation, useParams } from 'react-router-dom';
import { CompetitionHeader } from './components/Header';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { CompetitionBreadcrumb } from './components/Breadcrumb';
import { CompetitionAvatar } from './components/Avatar';
import { CompetitionNavigation, ValidCompetitionTabs } from './components/Navigation';

export const CompetitionDetail: React.FC = () => {
  const { id, disciplineId } = useParams();
  const widgetConfig = useWidgetConfig();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const tabParam = ValidCompetitionTabs.includes(lastSegment) ? lastSegment : 'disciplines';
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const config = getConfig(EntityType.Competition);

  const url = `${config.apiNode}/${id}?languageCode=${widgetConfig.language}`;
  const { data, error, isLoading } = useQuery({
    queryKey: [id, 'detail', widgetConfig.language],
    queryFn: () => apiService.fetch(url),
  });
  const dataContent = isLoading ? {} : (data?.data ?? {});
  const selectedDiscipline = dataContent?.disciplines?.find((d: any) => d.id === disciplineId);

  if (isLoading) {
    return <GenericLoadingPanel loading={true} />;
  }

  if (error) {
    return <ErrorPanel error={error} />;
  }

  const baseRoute = `/sdw/widget/competition/${id}`;

  return (
    <main>
      <Seo
        title={dataContent.title}
        description={`Details for ${dataContent.title}`}
        keywords={['Explore Results', 'Rankings', 'Records']}
      />
      <CompetitionBreadcrumb
        competition={dataContent}
        selectedDiscipline={selectedDiscipline}
        baseRoute={baseRoute}
        selectedValue={tabParam}
      />
      <MainCard
        title={
          <CompetitionHeader
            competition={dataContent}
            discipline={selectedDiscipline}
            baseRoute={baseRoute}
          />
        }
        avatar={<CompetitionAvatar competition={dataContent} />}
        size="small"
        border={false}
        headerSX={{ textAlign: 'left', pt: 8, pb: 0 }}
        contentSX={{ pt: 0 }}
        divider={false}
      >
        <CompetitionNavigation competition={dataContent} baseRoute={baseRoute} value={tabParam} />
      </MainCard>
    </main>
  );
};
