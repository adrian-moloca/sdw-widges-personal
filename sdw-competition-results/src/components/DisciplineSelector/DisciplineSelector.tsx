import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Stack, useTheme } from '@mui/material';
import { AdBanner, DisciplineMenu, Seo } from 'components';
import { useStoreCache, useModelConfig } from 'hooks';
import { EntityType, MasterData } from 'models';
import useApiService from 'hooks/useApiService';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { useParams } from 'react-router-dom';
import { getEventColumns } from './utils';
import { geCountryRegionDisplay } from 'helpers';
import { DisciplineAlphaSelector } from './DisciplineAlphaSelector';
import { StripedDataGrid } from 'controls';

interface Props {
  data: any;
}
export const DisciplineSelector: React.FC<Props> = ({ data }) => {
  const { id, disciplineId, eventId } = useParams();
  const theme = useTheme();
  const { getConfig } = useModelConfig();
  const widgetConfig = useWidgetConfig();
  const { getMasterDataValue } = useStoreCache();
  const config = getConfig(EntityType.Discipline);
  const apiService = useApiService();
  const selectedDiscipline = data?.disciplines?.find((d: any) => d.id === disciplineId) || null;
  const [eventSummaries, setEventSummaries] = useState<any[]>([]);
  const selectedEvent = eventSummaries.find((e) => e.id === eventId);

  useEffect(() => {
    if (disciplineId) {
      apiService
        .fetch(
          `${config.apiNode}/${disciplineId}?extended=true&languageCode=${widgetConfig.language}`
        )
        .then((response) => {
          setEventSummaries(
            response.data.events.map((event: any) => {
              let display = event?.title ?? '';
              const location = geCountryRegionDisplay(event);

              if (event.gender) {
                const gender = getMasterDataValue(event?.gender, MasterData.SportGender)?.value;
                if (!display.includes(gender)) display = `${display} - ${gender}`;
              }

              if (event.type?.startsWith('ETP-')) {
                const type = getMasterDataValue(event.type, MasterData.EventType)?.value;
                if (!display.includes(type)) display = `${display} (${type})`;
              }

              if (event.type) {
                const type = getMasterDataValue(event.type, MasterData.EventType)?.value;
                if (!display.includes(type) && !display.includes(type.replace(',', '')))
                  display = `${display} (${type})`;
              }

              if (location) {
                display = `${display} | ${location}`;
              }
              return {
                ...event,
                display: display,
              };
            })
          );
        });
    }
  }, [disciplineId, config.apiNode]);

  const baseRoute = `/sdw/widget/competition/${id}`;
  const seoTitle = selectedEvent
    ? selectedEvent.title
    : selectedDiscipline
      ? selectedDiscipline.title
      : `Competition ${data.title}`;
  return (
    <>
      <Seo
        title={seoTitle}
        description={`Details for ${seoTitle}`}
        keywords={['Explore Results', 'Rankings', 'Records']}
      />
      <Box>
        {!selectedDiscipline && <DisciplineAlphaSelector data={data} />}
        {selectedDiscipline && !selectedEvent && (
          <Container maxWidth={false} sx={{ py: 4 }}>
            <Stack direction={'row'} justifyContent={'flex-end'} mt={4}>
              <DisciplineMenu />
            </Stack>
            <Box display="flex" flexDirection="column" gap={1} mt={4}>
              <StripedDataGrid
                rows={eventSummaries}
                columns={getEventColumns(
                  `${baseRoute}/discipline/${selectedDiscipline.id}`,
                  !widgetConfig.visibility?.disableMedals,
                  (event) => {
                    widgetConfig.onEvent?.('event_click', { event });
                  }
                )}
                disableRowSelectionOnClick
                hideFooter
                getRowHeight={() => 100}
              />
              <Divider sx={{ my: theme.spacing(8) }} />
              <AdBanner />
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};
