import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import { t } from 'i18next';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import { FrameResultsTableDisplay } from './FrameResultsTableDisplay';
import { ExtendedCard } from 'controls';
import { humanize } from 'helpers';
import { visuallyHidden } from '@mui/utils';
import { uniq } from 'lodash';
import { useState, SetStateAction } from 'react';
import { FrameResultsCharts } from './FrameResultCharts';

type Props = {
  discipline: string;
  frameTable: any;
  title?: string;
};

export const FrameResultsTable = ({ discipline, frameTable, title }: Props) => {
  const [filterType, setFilterType] = useState('ALL');

  if (!frameTable) return null;
  if (!frameTable.pivotTable) return null;

  const uniqueTypes: string[] = uniq(
    frameTable.pivotTable.headers.map((header: any) => String(header.type))
  );

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setFilterType(event.target.value);
  };

  return (
    <Grid size={12}>
      <ExtendedCard
        titleText={title ? `${t('general.frame-results')}: ${title}` : t('general.frame-results')}
        icon={WatchOutlinedIcon}
        secondary={
          <>
            {uniqueTypes.length > 1 && (
              <Grid size={12} display="flex" justifyContent="end">
                <FormControl size="small">
                  <InputLabel id={`typeFilter-${title?.replace(' ', '')}`} sx={visuallyHidden}>
                    Filter by type
                  </InputLabel>
                  <Select
                    labelId={`typeFilter-${title?.replace(' ', '')}`}
                    size="small"
                    value={filterType}
                    onChange={handleChange}
                    inputProps={{
                      'aria-label': 'Filter by type',
                    }}
                    sx={{
                      boxShadow: 'none',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                      },
                      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                      },
                    }}
                  >
                    <MenuItem value="ALL">{t('general.all')}</MenuItem>
                    {uniqueTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {humanize(type)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </>
        }
      >
        <Grid container spacing={2}>
          <FrameResultsTableDisplay
            discipline={discipline}
            frameTable={frameTable}
            filterType={filterType}
          />
          <FrameResultsCharts
            frameTable={frameTable}
            filterType={filterType}
            discipline={discipline}
          />
        </Grid>
      </ExtendedCard>
    </Grid>
  );
};
