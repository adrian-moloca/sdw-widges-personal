import { Box, Collapse, darken, Stack, useTheme } from '@mui/material';
import { TypographyLink } from 'components/TypographyLink';
import { formatAthleteName } from 'helpers';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { olympicsDesignColors } from 'theme/colors';

export const ParticipantTeamMembers: React.FC<{
  data: any[];
  textAlign: 'left' | 'right';
  open: boolean;
}> = ({ data, textAlign, open }) => {
  const theme = useTheme();
  const config = useWidgetConfig();
  const isLeft = textAlign === 'left';
  const isRight = textAlign === 'right';

  return (
    <Collapse in={open}>
      <Box
        sx={{
          borderLeft: isRight ? `3px solid ${theme.palette.primary.main}` : undefined,
          borderRight: isLeft ? `3px solid ${theme.palette.primary.main}` : undefined,
          pl: 1.5,
          pr: 1.5,
          ml: isLeft ? 0 : 'auto',
          mr: isRight ? 'auto' : 0,
        }}
      >
        <Stack>
          {data.map((e, i) => {
            const type = e.id?.startsWith('IND') ? 'athlete-click' : 'team-click';
            const displayName = e.bib
              ? isLeft
                ? ` ${e.bib} ${formatAthleteName(e)}`
                : `${formatAthleteName(e)} ${e.bib}`
              : formatAthleteName(e);
            return (
              <TypographyLink
                key={i}
                value={displayName}
                typoSize="body2"
                sx={{
                  textAlign: isLeft ? 'right' : 'left',
                  lineHeight: 1.3,
                  color: darken(olympicsDesignColors.base.neutral.white, 0.1),
                }}
                onClick={() => {
                  config?.onClickAthlete?.('click', e);
                  config?.onEvent?.(type, e);
                }}
              />
            );
          })}
        </Stack>
      </Box>
    </Collapse>
  );
};
