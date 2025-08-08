import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import { DisciplineAlphaCard } from './DisciplineAlphaCard';

interface Props {
  data: any;
}
export const DisciplineAlphaSelector: React.FC<Props> = ({ data }) => {
  const { id } = useParams();
  const theme = useTheme();
  const [selectedLetter, setSelectedLetter] = useState(t('general.all'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const initialLetters = useMemo(() => {
    const letters = new Set<string>();
    data.disciplines?.forEach((d: any) => {
      if (d.title && d.title.length > 0) {
        letters.add(d.title[0].toUpperCase());
      }
    });

    const sortedLetters = Array.from(letters).sort((a, b) => {
      const isANumber = !isNaN(parseInt(a));
      const isBNumber = !isNaN(parseInt(b));

      if (isANumber && isBNumber) {
        return parseInt(a) - parseInt(b);
      }
      if (isANumber) return 1; // Numbers come after letters
      if (isBNumber) return -1; // Numbers come after letters
      return a.localeCompare(b); // Alphabetical sort for letters
    });

    return [t('general.all'), ...sortedLetters];
  }, [data.disciplines]);

  const groupedDisciplines = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    const sortedAllDisciplines = orderBy(data.disciplines, 'title');

    sortedAllDisciplines.forEach((d) => {
      if (d.title && d.title.length > 0) {
        const firstChar = d.title[0].toUpperCase();
        if (!groups[firstChar]) {
          groups[firstChar] = [];
        }
        groups[firstChar].push(d);
      }
    });

    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
      const isANumber = !isNaN(parseInt(a));
      const isBNumber = !isNaN(parseInt(b));

      if (isANumber && isBNumber) {
        return parseInt(a) - parseInt(b);
      }
      if (isANumber) return 1;
      if (isBNumber) return -1;
      return a.localeCompare(b);
    });

    return sortedGroupKeys.reduce(
      (acc, key) => {
        acc[key] = groups[key];
        return acc;
      },
      {} as { [key: string]: any[] }
    );
  }, [data.disciplines]);
  const filteredDisciplines = useMemo(() => {
    if (selectedLetter === t('general.all')) {
      return orderBy(data.disciplines, 'title');
    }
    return orderBy(
      data.disciplines.filter((d: any) => d.title?.toUpperCase().startsWith(selectedLetter)),
      'title'
    );
  }, [data.disciplines, selectedLetter]);

  const baseRoute = `/sdw/widget/competition/${id}`;
  return (
    <Container maxWidth={false}>
      <Grid container spacing={isMobile ? 0 : 2}>
        <Grid sx={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'flex-start',
              alignItems: isMobile ? 'flex-start' : 'center',
              mb: isMobile ? 2 : 4,
              gap: 1,
              pr: isMobile ? 2 : 0,
              pb: isMobile ? 2 : 0,
            }}
          >
            <ButtonGroup
              variant="outlined"
              orientation={isMobile ? 'vertical' : 'horizontal'}
              aria-label="discipline filter buttons"
            >
              {initialLetters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  variant={'text'}
                  size="small"
                  color={isMobile ? 'primary' : 'secondary'}
                  sx={{
                    minWidth: isMobile
                      ? 'auto'
                      : letter === t('general.all')
                        ? '60px!important'
                        : '30px!important',
                    padding: isMobile ? 'inherit' : 0,
                    lineHeight: 1,
                    fontFamily: theme.typography.h2.fontFamily,
                    fontSize: theme.typography.h2.fontSize,
                    color:
                      selectedLetter === letter ? theme.palette.grey[800] : theme.palette.grey[400],
                  }}
                >
                  {letter}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid size={{ xs: 10, sm: 12, md: 12, lg: 12 }}>
          {selectedLetter === t('general.all') ? (
            <Box>
              {Object.keys(groupedDisciplines).map(
                (
                  letterGroup: string // Specify type for 'letterGroup'
                ) => (
                  <Box key={letterGroup} sx={{ mb: 4 }}>
                    {!isMobile && (
                      <Typography
                        variant={isMobile ? 'body2' : 'h2'}
                        component="h2"
                        textAlign={'left'}
                        sx={{ mb: 2, ml: 1, fontWeight: 'bold', color: theme.palette.grey[500] }}
                      >
                        {letterGroup}
                      </Typography>
                    )}
                    <DisciplineAlphaCard
                      disciplines={groupedDisciplines[letterGroup]}
                      baseRoute={baseRoute}
                    />
                  </Box>
                )
              )}
            </Box>
          ) : (
            <Box>
              {filteredDisciplines.length > 0 ? (
                <DisciplineAlphaCard disciplines={filteredDisciplines} baseRoute={baseRoute} />
              ) : (
                <Typography variant="h6" align="center" color="textSecondary">
                  No disciplines found starting with "{selectedLetter}".
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
