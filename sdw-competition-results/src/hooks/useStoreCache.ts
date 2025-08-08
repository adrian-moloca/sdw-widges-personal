import { EntityType } from 'models/model';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, dataActions, IDataState, RootState } from 'store';
import useApiService from './useApiService';
import { Entry, MasterData, masterDataCategories, MasterDataCategory } from 'models';
import { useModelConfig } from './useModelConfig';
import { getMasterApiUrl } from 'config/apiConfig';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { formatMasterCode, humanize } from 'helpers';

interface Props {
  dataInfo: IDataState;
  handleMasterDataInfo: () => Promise<void>;
  getDisciplineCode: (code: string) => Entry;
  getMasterDataValue: (code: string, category: MasterDataCategory) => Entry;
  clearDataInfo: () => void;
}
export function useStoreCache(): Props {
  const apiService = useApiService();
  const { getConfig } = useModelConfig();
  const config = useWidgetConfig();
  const dispatch = useDispatch<AppDispatch>();
  const dataInfo = useSelector((x: RootState) => x.data);

  const handleMasterDataInfo = useCallback(async (): Promise<void> => {
    const variables: any = {
      enablePagination: true,
      languageCode: config.language.toUpperCase(),
      rows: 3000,
      start: 0,
    };
    const url = `${getMasterApiUrl(config.environment)}${getConfig(EntityType.Entry).apiNode}/`;
    for (const category of masterDataCategories) {
      if (!dataInfo[category] || dataInfo[category].length === 0) {
        const response = await apiService.getMasterData(`${url}${category}`, variables);
        dispatch(dataActions.setMasterData({ category, data: response.content }));
      }
    }
  }, [dataInfo, config.language]);

  const getDisciplineCode = (code: string): Entry => {
    const emptyEntry = { id: '', key: '', categoryKey: MasterData.Discipline, value: '' };
    if (!code) return emptyEntry;
    if (typeof code !== 'string') return emptyEntry;
    if (code.toUpperCase().startsWith('SDC-')) return emptyEntry;
    return (
      dataInfo[MasterData.Discipline].find(
        (y) =>
          code == y.key ||
          `${MasterData.Discipline}${code}` == y.key ||
          `${MasterData.Discipline}$${code}` == y.key
      ) ?? emptyEntry
    );
  };
  const getMasterDataValue = (code: string, category: MasterDataCategory): Entry => {
    const emptyEntry = {
      id: '',
      key: code,
      categoryKey: category,
      value: humanize(formatMasterCode(code)),
    };
    if (!code) return emptyEntry;
    if (typeof code !== 'string') return emptyEntry;
    return (
      dataInfo[category].find((y) => {
        const key = y.key.toLowerCase();
        const codeLower = code.toLowerCase();
        const categoryLower = category.toLowerCase();
        return (
          key === codeLower ||
          key === `${categoryLower}${codeLower}` ||
          key === `${categoryLower}$${codeLower}`
        );
      }) ?? emptyEntry
    );
  };

  const clearDataInfo = () => {
    dispatch(dataActions.clear());
  };

  return {
    dataInfo: dataInfo,
    getMasterDataValue: getMasterDataValue,
    getDisciplineCode: getDisciplineCode,
    handleMasterDataInfo: handleMasterDataInfo,
    clearDataInfo,
  };
}
