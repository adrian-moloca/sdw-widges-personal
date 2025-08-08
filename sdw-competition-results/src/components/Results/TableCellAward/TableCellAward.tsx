import get from 'lodash/get';
import { BronzeAvatar, GoldAvatar, SilverAvatar } from 'components';
import { Box } from '@mui/material';

export const AwardChip = (param: { data: any; includeSpacing?: boolean }) => {
  const awardSubclass = get(param.data, 'subClass') ?? get(param.data, 'awardCode');
  if (!awardSubclass && param.includeSpacing === true)
    return <Box sx={{ width: 21, height: 21 }}></Box>;
  if (
    awardSubclass === 'AWSB$ME_GOLD' ||
    awardSubclass === 'AWSB$GOLD' ||
    awardSubclass === 'GOLD_MEDAL'
  )
    return <GoldAvatar />;
  if (
    awardSubclass === 'AWSB$ME_SILVER' ||
    awardSubclass === 'AWSB$SILVER' ||
    awardSubclass === 'SILVER_MEDAL'
  )
    return <SilverAvatar />;
  if (
    awardSubclass === 'AWSB$ME_BRONZE' ||
    awardSubclass === 'AWSB$BRONZE' ||
    awardSubclass === 'BRONZE_MEDAL'
  )
    return <BronzeAvatar />;
  return param.includeSpacing === true ? <Box sx={{ width: 21, height: 21 }}></Box> : null;
};
