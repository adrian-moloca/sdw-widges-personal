import { Stack } from '@mui/material';
import { TypographyLink } from 'components';
import { CountryChip } from 'components/CountryChip';
import { formatMasterCode } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import get from 'lodash/get';
interface Props {
  data: any;
  extended: boolean;
  hideTitle?: boolean;
  variant: 'body1' | 'body2';
}

export const OrganisationChip = (param: Props) => {
  const config = useWidgetConfig();
  const country = get(param.data, 'country');
  const code = get(param.data, 'code');
  const id = get(param.data, 'id');
  const formatName = code?.startsWith('NOC') ? formatMasterCode(code) : formatMasterCode(country);
  const hideTitle = param.hideTitle === true;
  if (!id) return <></>;
  return (
    <Stack
      spacing={2}
      direction={'row'}
      alignItems={'center'}
      sx={hideTitle ? undefined : { minWidth: 60 }}
      component={'span'}
    >
      <CountryChip
        code={country}
        hideTitle={true}
        size={param.variant == 'body1' ? 'small' : 'tiny'}
      />
      {!hideTitle && (
        <TypographyLink
          value={param.extended ? get(param.data, 'name') : formatName}
          typoSize={param.variant}
          sx={{ fontWeight: 500 }}
          onClick={() => {
            config?.onClickOrganisation?.('click', param.data);
            config?.onEvent?.('organisation_click', param.data);
          }}
        />
      )}
    </Stack>
  );
};
