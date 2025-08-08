import React from 'react';
import { Box, Typography } from '@mui/material';
import { WidgetMedia } from 'types/WidgetMedia';

interface Props {
  media: WidgetMedia;
  onClick?: (media: WidgetMedia) => void;
}

const getPositionStyle = (pos: string | undefined) => {
  switch (pos) {
    case 'top-left':
      return { top: 0, left: 0 };
    case 'top-right':
      return { top: 0, right: 0 };
    case 'bottom-left':
      return { bottom: 0, left: 0 };
    case 'bottom-right':
      return { bottom: 0, right: 0 };
    default:
      return { top: 0, right: 0 };
  }
};

export const MediaOverlay: React.FC<Props> = ({ media, onClick }) => {
  const handleClick = () => {
    if (media.onClickTrackUrl) fetch(media.onClickTrackUrl); // Simple beacon
    onClick?.(media);
  };

  const style = {
    position: 'absolute' as const,
    zIndex: 1000,
    width: media.width ?? 200,
    height: media.height ?? 150,
    cursor: 'pointer',
    ...getPositionStyle(media.position),
  };

  return (
    <Box sx={style} onClick={handleClick}>
      {media.title && <Typography variant="caption">{media.title}</Typography>}
      {media.type === 'video' ? (
        <video width="100%" height="100%" muted autoPlay loop>
          <source src={media.videoUrl} type="video/mp4" />
          Your browser does not support video.
        </video>
      ) : (
        <img src={media.imageUrl} alt={media.title} width="100%" height="100%" />
      )}
    </Box>
  );
};
