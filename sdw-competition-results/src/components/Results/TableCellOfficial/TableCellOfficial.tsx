import { Stack } from '@mui/material';
import { OrganisationChip, TypographyLink } from 'components';
import { formatAthleteName } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import get from 'lodash/get';
interface Props {
  data: any;
  variant: 'body1' | 'body2';
}
export const OfficialChip = (param: Props) => {
  const config = useWidgetConfig();
  const displayName = formatAthleteName(param.data);
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
        sx={{ fontWeight: 300, pl: 1 }}
        onClick={() => {
          config?.onClickAthlete?.('click', param.data);
          config?.onEvent?.('official_click', param.data);
        }}
      />
    </Stack>
  );
};
