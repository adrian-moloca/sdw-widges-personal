import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ButtonTab } from 'controls';
import { t } from 'i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantGrid } from './ParticipantGrid';

export const CompetitionParticipants: React.FC = () => {
  const { id } = useParams();
  const [value, setValue] = useState('1');
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label={t('general.participants')}
        sx={{ '.MuiTabs-indicator': { backgroundColor: 'transparent' } }}
      >
        <ButtonTab label={t('general.athletes')} value="1" />
        <ButtonTab label={t('general.teams')} value="2" />
      </TabList>
      <TabPanel value="1" sx={{ p: 0 }}>
        <ParticipantGrid type="athlete" id={id ?? ''} />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        <ParticipantGrid type="team" id={id ?? ''} />
      </TabPanel>
    </TabContext>
  );
};
