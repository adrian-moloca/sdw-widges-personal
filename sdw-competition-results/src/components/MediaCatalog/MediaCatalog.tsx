import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { useEffect, useState } from 'react';
import { WidgetMedia } from 'types/WidgetMedia';
import { PlayCircle, OpenInNew } from '@mui/icons-material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { MainCard } from 'controls';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { shuffleArray } from './utils';
import { olympicsDesignColors } from 'theme/colors';
import { layout } from 'theme/layout';
type Props = {
  id: string;
};

export const MediaCatalog = ({ id }: Props) => {
  const widgetConfig = useWidgetConfig();
  const [videos, setVideos] = useState<WidgetMedia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    if (widgetConfig.media) {
      const mediaWithUnitId = widgetConfig.media.filter((m) => m.unitId === id);
      if (mediaWithUnitId.length > 0) {
        setVideos(mediaWithUnitId);
      } else {
        const mediaWithoutUnitId = widgetConfig.media.filter(
          (m) => m.unitId === null || m.unitId === undefined
        );
        const shuffledAndPickedMedia = shuffleArray([...mediaWithoutUnitId]).slice(0, 4);
        const combinedVideos = [...mediaWithUnitId, ...shuffledAndPickedMedia];
        setVideos(combinedVideos);
      }
    }
  }, [widgetConfig.media, id]);
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleVideoClick = (media: any) => {
    widgetConfig.onEvent?.('media_click', { value: media });
  };

  const getVisibleVideos = () => {
    if (isSmallScreen) {
      return [videos[currentIndex]];
    } else {
      const visible = [];
      const totalVideos = videos.length;
      const displayCount = isLargeScreen ? 4 : isMediumScreen ? 3 : 1;
      if (totalVideos === 0) return [];
      if (totalVideos <= displayCount) return videos;
      for (let i = 0; i < displayCount; i++) {
        visible.push(videos[(currentIndex + i) % totalVideos]);
      }
      return visible;
    }
  };

  const visibleVideos = getVisibleVideos();
  const totalVideos = videos.length;
  return (
    <Grid size={12}>
      <MainCard
        title={
          <Typography variant="h6" fontWeight={600}>
            {t('general.mediaCatalog')}
          </Typography>
        }
        divider={false}
        content={false}
        border={false}
        headerSX={{ py: theme.spacing(4) }}
        sx={[
          (theme) => ({
            width: '100%',
            textAlign: 'left',
            backgroundColor: theme.palette.background.default,
          }),
          (theme) =>
            theme.applyStyles('dark', {
              width: '100%',
              textAlign: 'left',
              backgroundColor: olympicsDesignColors.dark.general.background,
            }),
        ]}
        secondary={
          <Stack direction={'row'} spacing={1} alignItems="center">
            <Button
              onClick={goToPrevious}
              size="small"
              variant="outlined"
              disabled={currentIndex === 0 || totalVideos <= 1}
              sx={{
                p: 2,
                borderRadius: '9999px',
                transition: 'all 0.3s ease-in-out',
                minWidth: 'auto',
              }}
              aria-label="Previous video"
            >
              <ArrowBackOutlinedIcon fontSize="small" />
            </Button>
            <Button
              onClick={goToNext}
              size="small"
              variant="outlined"
              disabled={currentIndex === totalVideos - 1 || totalVideos <= 1}
              sx={{
                p: 1.5,
                borderRadius: '9999px',
                transition: 'all 0.3s ease-in-out',
                minWidth: 'auto',
              }}
              aria-label="Next video"
            >
              <ArrowForwardOutlinedIcon fontSize="small" />
            </Button>
          </Stack>
        }
      >
        <Grid container spacing={2} sx={{ px: theme.spacing(2) }}>
          {visibleVideos.map((video) => (
            <Grid size={{ xs: 12, md: 4, lg: 3 }} key={video?.id}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={video?.videoUrl ?? video?.url ?? ''}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  elevation={0}
                  sx={{
                    position: 'relative',
                    borderTopLeftRadius: layout.radius.md,
                    borderTopRightRadius: layout.radius.md,
                    overflow: 'hidden',
                    boxShadow: 0,
                    height: '100%',
                    background: 'transparent',
                    //maxWidth: '400px',
                    cursor: 'pointer',
                    '&:hover .play-overlay': {
                      opacity: 1,
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => handleVideoClick(video)}
                >
                  <CardMedia
                    component="img"
                    image={video?.imageUrl}
                    alt={video?.title}
                    sx={{
                      width: '100%',
                      height: 240,
                      borderTopLeftRadius: layout.radius.md,
                      borderTopRightRadius: layout.radius.md,
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Image+Error`;
                    }}
                  />
                  <Box
                    className="play-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      borderRadius: '8px',
                    }}
                  >
                    {video?.type == 'video' ? (
                      <PlayCircle sx={{ fontSize: 60, color: '#fff' }} />
                    ) : (
                      <OpenInNew sx={{ fontSize: 60, color: '#fff' }} />
                    )}
                  </Box>
                  <CardContent sx={{ textAlign: 'left', py: 1, px: 4, minHeight: '80px' }}>
                    <Typography variant="headline4" sx={{ mt: 1, fontWeight: 600 }}>
                      {video?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </Grid>
  );
};
