import { Grid, Typography, useMediaQuery } from '@mui/material';
import {
  CountryChip,
  ExtendedJudgeScoring,
  ExtendedPointsBreakdown,
  ExtendedSingleMetrics,
} from 'components';
import { MainCard } from 'controls';
import { useResults } from 'hooks/useResults';
import { t } from 'i18next';

type Props = {
  data: any;
  countryCode: string;
  title?: string;
  expandable: boolean;
};

export const CompetitorExtendedResult = ({ title, data, countryCode, expandable }: Props) => {
  const { hasExtendedResults } = useResults();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const hasExtendedInformation = hasExtendedResults(data, isMobile);
  if (!data || !hasExtendedInformation.hasExtended) return null;
  return (
    <Grid size={hasExtendedInformation.justFewMetrics ? { xs: 12, md: 6 } : 12}>
      <MainCard
        title={
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {title ? `${title}: ${t('general.extendedInfo')}` : t('general.extendedInfo')}
          </Typography>
        }
        fullHeight
        avatar={<CountryChip code={countryCode} size={'small'} hideTitle={true} />}
        divider={false}
        content={false}
        border={false}
        expandable={expandable}
        expandableOnHeader={expandable}
        defaultExpanded={!expandable}
        sx={{ backgroundColor: 'transparent' }}
        headerSX={{ textAlign: 'left' }}
      >
        <ExtendedPointsBreakdown data={data} />
        <ExtendedJudgeScoring data={data} />
        <ExtendedSingleMetrics data={data} />
      </MainCard>
    </Grid>
  );
};
