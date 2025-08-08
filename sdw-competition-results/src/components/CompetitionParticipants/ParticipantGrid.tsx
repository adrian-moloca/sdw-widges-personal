import {
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from '@mui/x-data-grid-pro';
import { useQuery } from '@tanstack/react-query';
import { StripedDataGrid } from 'controls/tables/StripedDataGrid';
import { useModelConfig, useStoreCache } from 'hooks';
import useApiService from 'hooks/useApiService';
import { EntityType, MasterData } from 'models';
import { useEffect, useMemo, useState } from 'react';
import { QueryOptionsProps } from './types';
import has from 'lodash/has';
import { calculateFilter } from './utils';
import { t } from 'i18next';
import { Typography } from '@mui/material';

interface Props {
  type: 'athlete' | 'team' | 'official';
  id: string;
}
export const ParticipantGrid: React.FC<Props> = ({ type, id }) => {
  const { getConfig } = useModelConfig();
  const { getMasterDataValue } = useStoreCache();
  const config = getConfig(EntityType.Participant);
  const apiService = useApiService();
  const defaultPaginationModel: GridPaginationModel = {
    pageSize: 25,
    page: 0,
  };
  const filter = {
    where: [],
    join: [
      {
        table: { name: 'discipline', column: 'id', alias: 'dsp' },
        reference: { name: 'participant', column: 'discipline_id', alias: 'ptc' },
        where: [{ column: 'competition_id', value: id }],
      },
    ],
    operator: 'AND',
  };
  const sorting = [{ column: 'participation_name', operator: 'ASC' }];
  const [paginationModel, setPaginationModel] = useState(defaultPaginationModel);
  const handleSortModelChange = (sortModel: GridSortModel) => {
    setPaginationModel(defaultPaginationModel);
    setQueryOptions({ ...queryOptions, sortModel: [...sortModel] });
  };
  const [queryOptions, setQueryOptions] = useState<QueryOptionsProps>({
    filterModel: { items: [], quickFilterValues: [] },
    sortModel: [],
  });
  const currentFilter = useMemo(() => {
    return calculateFilter(queryOptions, paginationModel, filter, sorting);
  }, [queryOptions, paginationModel]);

  const handleFilterChange = (filterModel: GridFilterModel) => {
    const validFilters = filterModel.items.filter((e: any) => has(e, 'value'));
    if (
      (validFilters && validFilters.length > 0) ||
      (filterModel.quickFilterValues && filterModel.quickFilterValues?.length > 0)
    ) {
      setPaginationModel(defaultPaginationModel);
      setQueryOptions({ ...queryOptions, filterModel: { ...filterModel } });
    } else {
      setPaginationModel(defaultPaginationModel);
      setQueryOptions({ ...queryOptions, filterModel: { items: [], quickFilterValues: [] } });
    }
  };
  const url =
    type === 'athlete'
      ? `${config.apiNode}/search/athletes`
      : type === 'team'
        ? `${config.apiNode}/search/teams`
        : `${config.apiNode}/search/officials`;
  const { data, error, isLoading } = useQuery({
    queryKey: [id, config.display, type, currentFilter],
    queryFn: () => apiService.search(url ?? `${config.apiNode}/search`, currentFilter),
  });
  const columns = [
    { field: 'participationName', headerName: t('general.name'), width: 380, flex: 1 },
    {
      field: 'gender',
      headerName: t('general.gender'),
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body1">
          {getMasterDataValue(params.value, MasterData.PersonGender)?.value}
        </Typography>
      ),
    },
    { field: 'function', headerName: t('general.function'), width: 200 },
  ];
  const gridData =
    isLoading || error
      ? { data: [], totalCount: undefined }
      : {
          data: data.content,
          totalCount: data?.pagination?.total ?? data?.content?.length ?? 0,
        };
  const [rowCountState, setRowCountState] = useState<number>(gridData?.totalCount ?? 0);
  useEffect(() => {
    setRowCountState((prevRowCountState: any) => gridData?.totalCount ?? prevRowCountState);
  }, [gridData?.totalCount, setRowCountState]);
  return (
    <StripedDataGrid
      rows={gridData.data}
      loading={isLoading}
      rowCount={rowCountState}
      disableColumnReorder
      disableColumnPinning
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      autosizeOptions={{ includeHeaders: true }}
      density="compact"
      paginationMode="server"
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      pagination={true}
      pageSizeOptions={[10, 25, 50, 100, 200]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      filterMode="server"
      filterModel={queryOptions?.filterModel}
      onFilterModelChange={handleFilterChange}
      sortingMode="server"
      showToolbar={true}
      sortModel={queryOptions?.sortModel}
      onSortModelChange={handleSortModelChange}
      columns={columns}
    />
  );
};
