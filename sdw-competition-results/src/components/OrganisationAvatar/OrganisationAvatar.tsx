import { Avatar } from '@mui/material';
import { apiConfig } from 'config/apiConfig';
import { formatMasterCode } from 'helpers';

import get from 'lodash/get';

interface OAProps {
  data: any;
  size: 'small' | 'medium';
}
export const OrganisationAvatar: React.FC<OAProps> = ({ data, size }: OAProps) => {
  const code = get(data, 'organisation.country');
  const countryCode = formatMasterCode(code);
  return (
    <Avatar
      variant="square"
      sx={{ height: size == 'small' ? '20px' : '40px', width: 'auto' }}
      src={apiConfig.flagIso3EndPoint.replace('{0}', countryCode)}
    />
  );
};
