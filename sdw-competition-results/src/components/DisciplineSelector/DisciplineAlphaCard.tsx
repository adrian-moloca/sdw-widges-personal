import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DisciplineAvatar } from 'components';
import { MainCard } from 'controls';
import { motion } from 'framer-motion';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);
interface Props {
  disciplines: any[];
  baseRoute: string;
}
export const DisciplineAlphaCard: React.FC<Props> = ({ disciplines, baseRoute }) => {
  const widgetConfig = useWidgetConfig();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {disciplines.length > 0 ? (
        disciplines.map((d: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={d.id}>
            <MotionLink
              key={d.id}
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              to={`${baseRoute}/discipline/${d.id}`}
              onClick={() => widgetConfig.onEvent?.('discipline_click', { d })}
              style={{
                cursor: 'pointer',
                borderRadius: '5px',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                border: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <MainCard
                sx={{ textAlign: 'center' }}
                size="small"
                title={
                  <Typography
                    variant={isMobile ? 'body1' : 'subtitle1'}
                    component={'h3'}
                    textAlign={'left'}
                  >
                    {d.title}
                  </Typography>
                }
                content={false}
                border={false}
                divider={false}
                fullHeight={true}
                headerSX={{
                  py: 2,
                  textAlign: !isMobile ? 'center' : 'left',
                  backgroundColor: theme.palette.grey[100],
                }}
                avatar={
                  <DisciplineAvatar
                    code={d.sportDisciplineId}
                    title={d.title}
                    size={isMobile ? 30 : 40}
                    sx={{ p: 2 }}
                  />
                }
              />
            </MotionLink>
          </Grid>
        ))
      ) : (
        <Grid size={12}>
          <Typography variant="h6" align="center" color="textSecondary">
            No disciplines found.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
