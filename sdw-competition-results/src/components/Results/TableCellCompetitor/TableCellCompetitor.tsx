import { Stack } from '@mui/material';
import { hasUniform, TypographyLink, UniformChip } from 'components';
import { formatAthleteName } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';

interface RCProps {
  data: any;
}
export const CompetitorChip: React.FC<RCProps> = ({ data }: RCProps) => {
  const config = useWidgetConfig();
  const displayName = formatAthleteName(data);
  const withUniform = hasUniform(data);
  if (withUniform)
    return (
      <Stack direction="row" spacing={0.5} alignItems={'center'}>
        <TypographyLink
          value={displayName}
          typoSize="body1"
          onClick={() => {
            config?.onClickAthlete?.('click', data);
            config?.onEvent?.('athlete-click', data);
          }}
        />
        <UniformChip data={data} />
        <UniformChip data={data} code="uniformGoalkeeper" />
      </Stack>
    );
  return (
    <TypographyLink
      value={displayName}
      typoSize="body1"
      onClick={() => {
        config?.onClickAthlete?.('click', data);
        config?.onEvent?.('athlete-click', data);
      }}
    />
  );
};
