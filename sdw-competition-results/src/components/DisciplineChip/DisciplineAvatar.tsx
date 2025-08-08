import { Avatar, SxProps } from '@mui/material';
import { apiConfig } from 'config/apiConfig';
import { getDisciplineCode } from 'helpers';

interface Props {
  code: string;
  title: string;
  size: number;
  border?: boolean;
  variant?: 'square' | 'circular' | 'rounded';
  sx?: SxProps;
}
export const DisciplineAvatar = (param: Props) => {
  if (!param.code) {
    return null;
  }

  return (
    <Avatar
      variant={param.variant ?? 'rounded'}
      src={apiConfig.disciplinesIconEndPoint.replace(
        '{0}',
        getDisciplineCode(param.code, param.title)
      )}
      alt={`avatar-${param.title}`}
      title={param.title}
      sx={{
        backgroundColor: 'white',
        width: `${param.size}px`,
        height: `${param.size}px`,
        border: param.border ? '1px solid #ccc' : 'none',
        borderRadius:
          param.variant === 'circular' ? '50%' : param.variant === 'rounded' ? '8px' : '0',
        ...param.sx,
      }}
    />
  );
};
