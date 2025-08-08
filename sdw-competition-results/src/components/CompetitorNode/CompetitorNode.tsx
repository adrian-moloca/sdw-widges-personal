import { Stack, Typography } from '@mui/material';
import { MainCard } from 'controls';
import { OrganisationAvatar } from 'components/OrganisationAvatar';
import { formatMasterCode } from 'helpers';

type Props = {
  data: any;
};

export const CompetitorNode = ({ data }: Props) => {
  return (
    <MainCard
      //content={!(!data.athletes || data.athletes.length === 0)}
      content={false}
      headerSX={{ height: 40 }}
      border={false}
      divider={true}
      title={
        <Stack direction={'row'} alignItems="center" justifyContent="space-between" width="100%">
          <Typography textAlign="left" lineHeight={1.1}>
            {data.participationName ?? data.name}
          </Typography>
          <Typography textAlign="left" lineHeight={1.1}>
            {data.result.value ?? formatMasterCode(data.result.irm)}
          </Typography>
        </Stack>
      }
      avatar={<OrganisationAvatar data={data} size="small" />}
      // onClick={() =>
      //TODO
      //   dispatch(
      //     drawerActions.setSelectedItem({
      //       item: { data: data, discipline: discipline },
      //       type: EntityType.Competitor,
      //       mode: EditionMode.Detail,
      //     })
      //   )
      // }
    >
      {/* {data.athletes?.map((athlete: any) => (
        <Stack key={athlete.id} direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" fontWeight="bold">
            {formatAthleteName(athlete)}
          </Typography>
        </Stack>
      ))} */}
    </MainCard>
  );
};
