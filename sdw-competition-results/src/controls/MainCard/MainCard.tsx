import React, { useState } from 'react';
import {
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  SxProps,
  Theme,
  Typography,
  TypographyVariant,
  useTheme,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { defaultHeaderSX, defaultHeaderSmSX } from './constants';
import { Title } from './Title';
import { StyleMainCard } from './StyleMainCard';

type Props = {
  id?: string;
  border?: boolean;
  expandable?: boolean;
  expandableOnHeader?: boolean;
  defaultExpanded?: boolean;
  boxShadow?: boolean;
  darkTitle?: boolean;
  divider?: boolean;
  dividerColor?: string;
  fullHeight?: boolean;
  elevation?: number;
  secondary?: React.ReactElement;
  shadow?: string;
  title?: string | React.ReactElement | React.ReactElement[];
  titleElement?: React.ReactElement | React.ReactElement[];
  subHeader?: React.ReactElement;
  superHeader?: React.ReactElement;
  avatar?: React.ReactElement | React.ReactElement[];
  subtitle?: string;
  codeHighlight?: boolean;
  content?: boolean;
  sx?: SxProps<Theme>;
  contentSX?: SxProps<Theme>;
  headerSX?: SxProps<Theme>;
  size?: 'large' | 'medium' | 'small' | 'tiny' | 'toolbar';
  children?: React.ReactElement | React.ReactElement[];
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
};

export const MainCard = ({
  id,
  border = true,
  expandable = false,
  expandableOnHeader = false,
  boxShadow,
  children,
  content = true,
  contentSX = {},
  darkTitle,
  divider = true,
  dividerColor,
  defaultExpanded = true,
  elevation,
  secondary,
  fullHeight,
  shadow,
  sx = {},
  headerSX = {},
  title,
  titleElement,
  avatar,
  superHeader,
  subtitle,
  size,
  subHeader,
  ref,
  onClick,
  ...others
}: Props) => {
  const theme = useTheme();
  const [showDetail, setShowDetail] = useState<boolean>(defaultExpanded === true);

  boxShadow = theme.palette.mode === 'dark' ? (boxShadow ?? true) : boxShadow;
  const titleSizeMap: Record<string, TypographyVariant> = {
    large: 'h4',
    medium: 'h5',
    small: 'subtitle1',
    tiny: 'body1',
  };

  const titleSize: TypographyVariant = size ? (titleSizeMap[size] ?? 'h5') : 'h5';

  const handleExpandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowDetail(!showDetail);
  };

  return (
    <StyleMainCard
      elevation={elevation ?? 0}
      onClick={() => {
        if (onClick) onClick();
      }}
      id={id}
      ref={ref}
      {...others}
      sx={sx}
    >
      {!darkTitle &&
        (title || titleElement || subtitle || subHeader || superHeader || secondary) && (
          <CardHeader
            sx={
              size === 'toolbar'
                ? {
                    cursor: expandableOnHeader ? 'pointer' : 'default',
                    paddingBottom: 0,
                    ...headerSX,
                  }
                : size === 'small'
                  ? {
                      cursor: expandableOnHeader ? 'pointer' : 'default',
                      ...defaultHeaderSmSX,
                      ...headerSX,
                    }
                  : {
                      cursor: expandableOnHeader ? 'pointer' : 'default',
                      ...defaultHeaderSX,
                      ...headerSX,
                    }
            }
            avatar={avatar}
            title={
              <>
                {superHeader}
                <Title title={title} titleSize={titleSize} />
                {titleElement}
                {subtitle && (
                  <Typography
                    variant="body1"
                    component={'div'}
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                  />
                )}
                {subHeader}
              </>
            }
            onClick={() => {
              if (expandableOnHeader) {
                setShowDetail(!showDetail);
              }
            }}
            action={
              secondary ||
              (expandable && (
                <IconButton aria-label="expand" size="small" onClick={handleExpandClick}>
                  {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              ))
            }
          />
        )}
      {darkTitle && title && (
        <CardHeader
          sx={
            size === 'toolbar'
              ? {
                  cursor: expandableOnHeader ? 'pointer' : 'default',
                  paddingBottom: 0,
                  ...headerSX,
                }
              : size === 'small'
                ? {
                    cursor: expandableOnHeader ? 'pointer' : 'default',
                    ...defaultHeaderSmSX,
                    ...headerSX,
                  }
                : {
                    cursor: expandableOnHeader ? 'pointer' : 'default',
                    ...defaultHeaderSX,
                    ...headerSX,
                  }
          }
          avatar={avatar}
          title={
            <>
              {superHeader}
              <Title title={title} titleSize={titleSize} />
              {subtitle && (
                <Typography
                  variant="body1"
                  component={'div'}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              )}
              {subHeader}
            </>
          }
          action={
            secondary ||
            (expandable && (
              <IconButton aria-label="expand" size="small" onClick={handleExpandClick}>
                {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            ))
          }
        />
      )}
      {title && divider && <Divider sx={{ bgcolor: dividerColor }} />}
      {content && showDetail && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && showDetail && children}
    </StyleMainCard>
  );
};
