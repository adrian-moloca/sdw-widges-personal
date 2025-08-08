import get from 'lodash/get';
import { medalMap } from 'config';
import { MedalAvatarMap } from 'components/AwardAvatar';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { OrganisationChip } from 'components/Results';
import { formatAthleteName } from 'helpers';

type Props = {
  data: any;
};
export const AwardParticipantChip: React.FC<Props> = ({ data }) => {
  const awardSubclass = get(data, 'subClass');
  const medalColor = medalMap[awardSubclass] ?? 'bronze'; // Default to bronze
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack direction={'row'} spacing={3} alignItems={'center'}>
      {MedalAvatarMap[medalColor](21)}
      <OrganisationChip
        data={data.organisation}
        extended={false}
        variant={'body1'}
        hideTitle={isMobile}
      />
      <Typography fontWeight={'bold'}>
        {data.person ? formatAthleteName(data.person) : data.participationName}
      </Typography>
    </Stack>
  );
};
