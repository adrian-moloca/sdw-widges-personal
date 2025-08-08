import { getUsdmApiUrl } from 'config/apiConfig';
import { formatMasterCode } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { EntityType, IConfigProps, IQueryProps } from 'models';

import useModelDefinition from 'models/model.config';
interface Props {
  getConfig: (type: EntityType) => IConfigProps;
  getDataSource: (type: EntityType) => IQueryProps;
  getDataSourceUrl: (type: EntityType) => string;
  hasDisciplineRecords: (type: string) => boolean;
}
export function useModelConfig(): Props {
  const { modelConfig } = useModelDefinition();
  const config = useWidgetConfig();

  const disciplinesWithRecords: string[] = [
    'SDIS$ARC-O',
    'SDIS$ARC',
    'SDIS$ATH',
    'SDIS$CLB',
    'SDIS$CMA',
    'SDIS$CSP',
    'SDIS$CTR',
    'SDIS$FEN',
    'SDIS$MPN',
    'SDIS$ROW',
    'SDIS$SHO',
    //'SDIS$SJP',
    'SDIS$SPS',
    'SDIS$SSK',
    'SDIS$STK',
    'SDIS$SWM',
    'SDIS$WLF',
  ];
  const hasDisciplineRecords = (type: string) => {
    return (
      disciplinesWithRecords.includes(type) ||
      disciplinesWithRecords.map((x) => formatMasterCode(x)).includes(type)
    );
  };
  const getConfig = (type: EntityType) => {
    return modelConfig[type];
  };
  const getDataSource = (type: EntityType) => {
    const config = getConfig(type);
    return {
      url: getDataSourceUrl(type),
      queryKey: config?.apiNode,
    };
  };

  const getDataSourceUrl = (type: EntityType) => {
    const typeConfig = getConfig(type);
    return `${getUsdmApiUrl(config.environment)}${typeConfig.apiNode}`;
  };
  return {
    getConfig: getConfig,
    getDataSource: getDataSource,
    getDataSourceUrl: getDataSourceUrl,
    hasDisciplineRecords: hasDisciplineRecords,
  };
}
