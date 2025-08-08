import { Stack } from '@mui/material';
import { TypographyLink } from 'components/TypographyLink';
import { UniformChip } from 'components/UniformChip';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { olympicsDesignColors } from 'theme/colors';

export const ParticipantIdentity: React.FC<{
  data: any;
  textAlign: 'left' | 'right' | 'center';
  displayName: string;
}> = ({ data, textAlign, displayName }) => {
  const config = useWidgetConfig();
  const isLeft = textAlign === 'left';
  const getDisplayName = () => {
    if (displayName.includes('/')) {
      return displayName.split('/');
    }
    return displayName;
  };

  if (textAlign === 'center') {
    return (
      <TypographyLink
        value={getDisplayName()}
        typoSize={'h5'}
        sx={{
          textAlign: 'center',
          color: olympicsDesignColors.base.neutral.white,
        }}
        onClick={() => {
          config?.onClickAthlete?.('click', data);
          config?.onEvent?.('athlete-click', data);
        }}
      />
    );
  }
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ py: 2 }}>
      {isLeft ? (
        <>
          <TypographyLink
            value={getDisplayName()}
            typoSize="h5"
            sx={{
              textAlign: 'right',
              color: olympicsDesignColors.base.neutral.white,
            }}
            onClick={() => {
              config?.onClickAthlete?.('click', data);
              config?.onEvent?.('athlete-click', data);
            }}
          />
          <UniformChip data={data} />
          <UniformChip data={data} code="uniformGoalkeeper" />
        </>
      ) : (
        <>
          <UniformChip data={data} code="uniformGoalkeeper" />
          <UniformChip data={data} />
          <TypographyLink
            value={getDisplayName()}
            typoSize="h5"
            sx={{
              textAlign: 'left',
              color: olympicsDesignColors.base.neutral.white,
            }}
            onClick={() => {
              config?.onClickAthlete?.('click', data);
              config?.onEvent?.('athlete-click', data);
            }}
          />
        </>
      )}
    </Stack>
  );
};
