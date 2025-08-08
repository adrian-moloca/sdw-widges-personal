import React from 'react';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Banner1 from 'assets/images/Picture1.png';
import Banner2 from 'assets/images/Picture2.png';

export const AdBanner: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ py: 1, textAlign: 'center' }}>
      <Stack spacing={0}>
        <a href="https://milanocortina2026.olympics.com" target="_blank" rel="noopener noreferrer">
          <img
            src={Banner1}
            alt="OCS - Sports Data Warehouse Banner 1"
            style={{ height: isMobile ? 50 : 80, width: 'auto', maxWidth: '100%' }}
          />
        </a>
        <a href="https://www.olympics.com" target="_blank" rel="noopener noreferrer">
          <img
            src={Banner2}
            alt="OCS - Sports Data Warehouse Banner 2"
            style={{ height: isMobile ? 24 : 30, width: 'auto', maxWidth: '100%' }}
          />
        </a>
      </Stack>
    </Box>
  );
};
