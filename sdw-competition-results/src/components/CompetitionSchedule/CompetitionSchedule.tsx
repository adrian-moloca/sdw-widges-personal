import { useQuery } from '@tanstack/react-query';
import useApiService from 'hooks/useApiService';
import { useModelConfig } from 'hooks';
import orderBy from 'lodash/orderBy';
import { useNavigate, useParams } from 'react-router-dom';
import { EntityType } from 'models';
import {
  generateCalendarColumns,
  generateCalendarRows,
  getAllCalendarDates,
} from 'helpers/calendar';
import { VerticalStripedDataGridBase } from 'controls';
import { GridRowId } from '@mui/x-data-grid-pro';
import { useState } from 'react';
import { Container } from '@mui/material';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { AdBanner } from 'components/AdBanner';

export const CompetitionSchedule = () => {
  const { id } = useParams();
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const widgetConfig = useWidgetConfig();
  const navigate = useNavigate();
  const config = getConfig(EntityType.Competition);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<GridRowId | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const baseRoute = `/sdw/widget/competition/${id}`;
  const handleHover = (rowIndex: GridRowId | null, field: string | null) => {
    setHoveredRowIndex(rowIndex);
    setHoveredField(field);
  };
  const handleClickDiscipline = (value: any) => {
    widgetConfig.onEvent?.('discipline_click', { value });
    navigate(`${baseRoute}/discipline/${value.id}`);
  };
  const url = `${config.apiNode}/${id}/calendar`;
  const { data, isLoading } = useQuery({
    queryKey: [id, 'calendar'],
    queryFn: () => apiService.fetch(url),
  });
  const dataContent = isLoading ? [] : (data?.data ?? []);
  const rowsWithOrder = orderBy(dataContent, 'discipline.title');
  const allDates = getAllCalendarDates(rowsWithOrder);
  const columns = generateCalendarColumns(
    allDates,
    hoveredRowIndex,
    hoveredField,
    handleHover,
    handleClickDiscipline
  );
  const rows = generateCalendarRows(rowsWithOrder, allDates);
  return (
    <Container maxWidth={false}>
      <VerticalStripedDataGridBase
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableColumnMenu
        disableColumnFilter
        disableRowSelectionOnClick
        getRowId={(row) => row.discipline.id}
        density="compact"
        getRowClassName={
          widgetConfig.dataDisplay?.enableStripedTables === true
            ? (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')
            : undefined
        }
        getRowHeight={() => 'auto'}
        columnHeaderHeight={60}
        initialState={{ pinnedColumns: { left: ['discipline'] } }}
        onRowClick={(params) => {
          widgetConfig.onEvent?.('discipline_click', { data: params.row.discipline });
          navigate(`${baseRoute}/discipline/${params.row.discipline.id}`);
        }}
        hideFooter
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
        }}
      />
      <AdBanner />
    </Container>
  );
};
