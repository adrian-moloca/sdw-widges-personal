import { Grid } from '@mui/material';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { JudgeScoringTable } from './JudgeScoringTable';
import { ExtendedCard } from 'controls';

type Props = {
  data: any;
  title?: string;
};
export const JudgeScoringCard = ({ data }: Props) => {
  const hasCategories = data.categories && data.categories.length > 0;
  return (
    <Grid size={12}>
      <ExtendedCard titleText={data.title} icon={GavelOutlinedIcon}>
        {hasCategories ? (
          data.categories?.map((category: any) => (
            <JudgeScoringTable key={category.code} data={data} category={category} />
          ))
        ) : (
          <JudgeScoringTable data={data} />
        )}
      </ExtendedCard>
    </Grid>
  );
};
