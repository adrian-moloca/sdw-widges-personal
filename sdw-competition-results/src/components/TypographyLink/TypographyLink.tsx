import { SxProps, Theme, Typography, TypographyVariant, useColorScheme } from '@mui/material';
import { Nullable } from 'models';
import { Link as RouteLink } from 'react-router-dom';
interface Props {
  value: string | string[];
  route?: Nullable<string>;
  onClick?: () => void;
  direct?: boolean;
  sx?: SxProps<Theme>;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  typoSize?: TypographyVariant;
  component?: React.ElementType;
  renderAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const TypographyLink = ({
  value,
  route,
  onClick,
  typoSize,
  textDecorationStyle,
  direct,
  sx,
  component,
  renderAs,
}: Props) => {
  const { mode } = useColorScheme();
  // Shared styles
  const commonStyles: SxProps<Theme> = {
    lineHeight: 1.2,
    textDecoration: 'none',
    cursor: 'pointer',
    color: mode === 'dark' ? 'white' : 'black',
    transition: 'text-decoration-color 0.2s ease-in-out',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationStyle: textDecorationStyle ?? 'dotted',
      textUnderlineOffset: '4px',
    },
    ...sx,
  };
  const title = Array.isArray(value) ? value.join('-') : value;
  if (!route && !onClick)
    return (
      <Typography
        variant={typoSize}
        title={title}
        {...(component ? { component } : {})}
        {...(renderAs ? { component: renderAs } : {})}
        sx={{ ...commonStyles, cursor: 'default', '&:hover': undefined, whiteSpace: 'pre-line' }}
      >
        {Array.isArray(value) ? value.join('\n') : value}
      </Typography>
    );
  if (route && direct === true)
    return (
      <Typography
        variant={typoSize}
        {...(renderAs ? { component: renderAs } : {})}
        title={title}
        sx={{ ...commonStyles, whiteSpace: 'pre-line' }}
      >
        <RouteLink
          to={route}
          title={title}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            whiteSpace: 'pre-line',
          }}
          onClick={onClick}
        >
          {Array.isArray(value) ? value.join('\n') : value}
        </RouteLink>
      </Typography>
    );
  if (route)
    return (
      <Typography
        variant={typoSize}
        {...(renderAs ? { component: renderAs } : {})}
        title={title}
        sx={{ ...commonStyles, whiteSpace: 'pre-line' }}
      >
        <RouteLink
          to={route}
          title={title}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={onClick}
        >
          {Array.isArray(value) ? value.join('\n') : value}
        </RouteLink>
      </Typography>
    );
  if (onClick)
    return (
      <Typography
        variant={typoSize}
        title={title}
        onClick={onClick}
        {...(component ? { component } : {})}
        sx={{ ...commonStyles, whiteSpace: 'pre-line' }}
      >
        {Array.isArray(value) ? value.join('\n') : value}
      </Typography>
    );
};
