import { Box, Stack, useTheme } from '@mui/material';
import { MedalAvatarMap } from 'components/AwardAvatar';
import { TypographyLink } from 'components/TypographyLink';
import { t } from 'i18next';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

type Props = {
  data: any;
};
export const BracketHeader: React.FC<Props> = ({ data }) => {
  const config = useWidgetConfig();
  const theme = useTheme();
  const title =
    data.title?.indexOf('Game') > -1
      ? data.title
      : `${data.title}, ${t('general.game')} ${data.order ?? 'N'}`;
  const isGolden =
    data.title.toLowerCase().includes('gold') || data.title.toLowerCase().includes('big final');
  const isBronze =
    data.title.toLowerCase().includes('bronze') || data.title.toLowerCase().includes('small final');
  return (
    <Box gap={2} sx={{ py: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" flexGrow={1}>
        <TypographyLink
          value={title}
          typoSize="body1"
          sx={{ color: theme.palette.common.white, pl: 1, pt: 1 }}
          onClick={() => {
            config?.onClickUnit?.('click', data);
            config?.onEvent?.('unit_click', data);
          }}
        />
        {isGolden && <>{MedalAvatarMap['golden'](21)}</>}
        {isBronze && <>{MedalAvatarMap['bronze'](21)}</>}
      </Stack>
    </Box>
  );
};
