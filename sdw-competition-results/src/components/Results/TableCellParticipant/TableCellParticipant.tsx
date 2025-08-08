import { Stack } from '@mui/material';
import { OrganisationChip, TypographyLink } from 'components';
import { formatAthleteName } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import get from 'lodash/get';

export const ParticipantChip = (param: {
  data: any;
  extended?: boolean;
  variant: 'body1' | 'body2';
}) => {
  const config = useWidgetConfig();
  const displayName = formatAthleteName(param.data);
  if (param.extended)
    return (
      <Stack
        spacing={0.5}
        direction={'row'}
        alignContent={'center'}
        sx={{ alignItems: 'center' }}
        component={'span'}
      >
        <OrganisationChip
          data={get(param.data, 'organisation')}
          extended={false}
          variant={param.variant}
        />
        <TypographyLink
          value={displayName}
          typoSize={param.variant}
          sx={{ fontWeight: 300 }}
          onClick={() => {
            config?.onClickAthlete?.('click', param.data);
            config?.onEvent?.('athlete-click', param.data);
          }}
        />
      </Stack>
    );
  return (
    <TypographyLink
      value={displayName}
      typoSize={param.variant}
      sx={{ fontWeight: 300 }}
      onClick={() => {}}
    />
  );
};
