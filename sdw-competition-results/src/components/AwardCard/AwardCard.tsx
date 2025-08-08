import { AvatarGroup, Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AthleteAvatar, AwardCardMedal, CountryChip } from 'components';
import { MainCard } from 'controls';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import get from 'lodash/get';

type Props = {
  data: any;
};

export const AwardCard = ({ data }: Props) => {
  const config = useWidgetConfig();
  const theme = useTheme();
  const country = get(data.organisation, 'country');
  const name = get(data.organisation, 'name');
  const fullName = name;
  const numberOfAthletes = data.participants?.length ?? 0;
  const hasParticipants = data.participants && data.participants?.length > 0;
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  if (data.type === 'INDIVIDUAL')
    return (
      <MainCard
        sx={{
          height: '100%',
          borderColor: `${theme.palette.divider}!important`,
          border: '1px solid',
          p: 0,
        }}
        content={false}
        elevation={0}
        onClick={() => {
          config?.onClickAthlete?.('click', data.data);
          config?.onEvent?.('athlete-click', data.data);
        }}
      >
        <AwardCardMedal data={data} />
        <Box padding={4} gap={4}>
          <Box display="flex" justifyContent="center" my={8}>
            {data.person ? (
              <AthleteAvatar
                src={data.person.profileImages}
                alt={data.participationName}
                size={isMobile ? '8rem' : '12rem'}
                bordered={true}
              />
            ) : (
              <CountryChip
                code={country}
                title={data.participationName}
                size="xlarge"
                hideTitle={true}
              />
            )}
          </Box>
          <Typography
            variant="headline2"
            fontFamily={theme.typography.h1.fontFamily}
            textAlign={'center'}
            sx={{ mt: 4 }}
          >
            {data.participationName}
          </Typography>
          <Stack
            spacing={1}
            direction="row"
            alignContent="center"
            alignItems={'center'}
            justifyContent={'center'}
          >
            <CountryChip code={country} hideTitle={true} size={'small'} />
            <Typography variant="body1"> {fullName} </Typography>
          </Stack>
        </Box>
      </MainCard>
    );

  if (data.type === 'TEAM' && numberOfAthletes > 3) {
    return (
      <MainCard
        sx={{
          height: '100%',
          borderColor: `${theme.palette.divider}!important`,
          border: '1px solid',
          p: 0,
        }}
        content={false}
        elevation={0}
        onClick={() => {
          config?.onClickTeam?.('click', data.data);
          config?.onEvent?.('click-team', data.data);
        }}
      >
        <AwardCardMedal data={data} />
        <Box padding={4} gap={4}>
          <Box display="flex" justifyContent="center" my={isMobile ? 4 : 8}>
            <CountryChip
              code={country}
              title={data.participationName}
              size={isMobile ? 'large' : 'xlarge'}
              hideTitle={true}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="headline2"
              fontFamily={theme.typography.h1.fontFamily}
              textAlign={'center'}
              sx={{ mt: 4 }}
            >
              {data.participationName}
            </Typography>
          </Box>
          {hasParticipants && (
            <Box display="flex" justifyContent="center" textAlign="center">
              <Typography variant="body2" color="textSecondary">
                {data.participants?.map((athlete: any) => athlete.name).join(' • ')}
              </Typography>
            </Box>
          )}
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard
      sx={{
        height: '100%',
        borderColor: `${theme.palette.divider}!important`,
        border: '1px solid',
        p: 0,
      }}
      content={false}
      elevation={0}
      onClick={() => {
        config?.onClickTeam?.('click', data.data);
        config?.onEvent?.('click-team', data.data);
      }}
    >
      <AwardCardMedal data={data} />
      <Box padding={4} gap={4}>
        <Box display="flex" justifyContent="center" my={isMobile ? 4 : 8}>
          {hasParticipants ? (
            <AvatarGroup max={3} spacing={20}>
              {data.participants.map((p: any) => (
                <AthleteAvatar
                  key={p.id}
                  src={p.profileImages}
                  alt={p.name}
                  size={isMobile ? '8rem' : '12rem'}
                  bordered={true}
                />
              ))}
            </AvatarGroup>
          ) : (
            <CountryChip
              code={country}
              title={data.participationName}
              size={isMobile ? 'large' : 'xlarge'}
              hideTitle={true}
            />
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="headline2"
            fontFamily={theme.typography.h1.fontFamily}
            textAlign={'center'}
            sx={{ mt: 4 }}
          >
            {data.participationName}
          </Typography>
        </Box>
        {hasParticipants && (
          <Box display="flex" justifyContent="center" textAlign="center">
            <Typography variant="body2" color="textSecondary">
              {data.participants?.map((athlete: any) => athlete.name).join(' • ')}
            </Typography>
          </Box>
        )}
        <Stack
          spacing={1}
          direction="row"
          alignContent="center"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CountryChip code={country} hideTitle={true} size={'small'} />
          <Typography variant="body1"> {fullName} </Typography>
        </Stack>
      </Box>
    </MainCard>
  );
};
