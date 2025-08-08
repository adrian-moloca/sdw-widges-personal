import { Box, darken, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MatchCompetitorDisplay } from './MatchCompetitorDisplay';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getScheduleDate, MedalAvatarMap } from 'components';
import { t } from 'i18next';
import { olympicsDesignColors } from 'theme/colors';
import { layout } from 'theme/layout';

interface MatchCardProps {
  match: any;
  isSelected?: boolean;
}
/**
 * Renders a card component displaying information about a specific match, including its title,
 * competitors, schedule, and status. The card visually indicates selection state and provides
 * navigation to the match's detailed results page. Special icons are shown for golden and bronze matches.
 *
 * @param match - The match data to display, including title, competitors, and metadata.
 * @param isSelected - Optional. If true, highlights the card as selected. Defaults to false.
 *
 * @remarks
 * - Uses theme colors for styling and hover effects.
 * - Displays medal icons for golden and bronze matches.
 * - Navigates to a detailed match results page when clicked.
 */
export const MatchCard: React.FC<MatchCardProps> = ({ match, isSelected = false }) => {
  const theme = useTheme();
  const { id, disciplineId, eventId, phaseId } = useParams();
  const [searchParams] = useSearchParams();
  const hoverEffect = !isSelected
    ? {
        '&:hover': {
          boxShadow: theme.shadows[4], // Stronger shadow on hover
        },
      }
    : {};
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const title =
    match.title?.indexOf('Game') > -1
      ? match.title
      : `${match.title}, ${t('general.game')} ${match.order ?? 'N'}`;
  const isGolden =
    match.title.toLowerCase().includes('gold') || match.title.toLowerCase().includes('big final');
  const isBronze =
    match.title.toLowerCase().includes('bronze') ||
    match.title.toLowerCase().includes('small final');
  const linkTo = phaseId
    ? `/sdw/widget/competition/${id}/discipline/${disciplineId}/event/${eventId}/phase/${phaseId}/unit/${match.id}?category=results&round=${searchParams.get('round')}`
    : `/sdw/widget/competition/${id}/discipline/${disciplineId}/event/${eventId}/unit/${match.id}?category=results&round=${searchParams.get('round')}`;
  return (
    <Link
      to={linkTo}
      style={{ textDecoration: 'none', color: 'inherit' }} // Remove default browser link styling
    >
      <Box
        sx={[
          (theme) => ({
            backgroundColor: isSelected
              ? darken(theme.palette.primary.dark, 0.8)
              : theme.palette.background.paper,
            borderRadius: layout.radius.sm,
            overflow: 'hidden',
            width: isMobile ? '100%' : 600,
            height: '100%',
            color: isSelected
              ? theme.palette.getContrastText(theme.palette.primary.dark)
              : theme.palette.text.primary,
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease-in-out',
            ...hoverEffect,
          }),
          (theme) =>
            theme.applyStyles('dark', {
              backgroundColor: isSelected
                ? darken(theme.palette.primary.dark, 0.8)
                : olympicsDesignColors.dark.general.background,
              borderRadius: layout.radius.sm,
              overflow: 'hidden',
              width: isMobile ? '100%' : 600,
              height: '100%',
              color: isSelected
                ? theme.palette.getContrastText(theme.palette.primary.dark)
                : olympicsDesignColors.dark.text.primary,
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease-in-out',
              ...hoverEffect,
            }),
        ]}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
          justifyItems={'flex-start'}
          spacing={0}
          textAlign={'left'}
          height={'100%'}
          divider={
            <Divider
              orientation={isMobile ? 'horizontal' : 'vertical'}
              flexItem
              sx={{ borderColor: theme.palette.divider }}
            />
          }
        >
          <Box
            sx={[
              (theme) => ({
                padding: '12px 16px',
                width: isMobile ? '100%' : '50%',
                color: isSelected
                  ? theme.palette.getContrastText(theme.palette.primary.dark)
                  : theme.palette.text.primary,
              }),
              (theme) =>
                theme.applyStyles('dark', {
                  padding: '12px 16px',
                  width: isMobile ? '100%' : '50%',
                  color: isSelected
                    ? theme.palette.getContrastText(theme.palette.primary.dark)
                    : olympicsDesignColors.dark.text.primary,
                }),
            ]}
          >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Typography
                variant="body1"
                fontWeight={600}
                color={'inherit'}
                lineHeight={1.3}
                gutterBottom
              >
                {title}
              </Typography>
              {isGolden && <>{MedalAvatarMap['golden'](21)}</>}
              {isBronze && <>{MedalAvatarMap['bronze'](21)}</>}
            </Stack>
            <Typography variant="body2">{getScheduleDate(match)}</Typography>
          </Box>
          <Box sx={{ padding: '12px 16px', width: isMobile ? '100%' : '50%' }}>
            <MatchCompetitorDisplay competitor={match.competitors?.[0]} isSelected={isSelected} />
            <MatchCompetitorDisplay competitor={match.competitors?.[1]} isSelected={isSelected} />
          </Box>
        </Stack>
      </Box>
    </Link>
  );
};
