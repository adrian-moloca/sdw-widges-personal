import { TableCell } from '@mui/material';
import { useStoreCache } from 'hooks';
import get from 'lodash/get';
import { MasterData } from 'models';

export const TableCellResultStatus = (param: { data: any }) => {
  return (
    <TableCell>
      <ResultStatusChip {...param} />
    </TableCell>
  );
};
export const ResultStatusChip = (param: { data: any }) => {
  const { getMasterDataValue } = useStoreCache();
  const status = get(param.data, 'status');
  if (!status) return <>-</>;
  return <>{getMasterDataValue(status, MasterData.ResultStatus)?.value ?? '-'}</>;
};
