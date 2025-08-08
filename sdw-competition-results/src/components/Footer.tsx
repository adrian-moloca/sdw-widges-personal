import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import logoWhite from 'assets/images/logo-white-small.svg';
import logoDark from 'assets/images/logo-black-small.svg';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { t } from 'i18next';
interface FooterConfig {
  text?: string;
  showSupportLink?: boolean;
  customStyles?: React.CSSProperties;
}

interface FooterProps {
  config?: FooterConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const widgetConfig = useWidgetConfig();
  const {
    text = `© ${new Date().getFullYear()} SDW Widgets. ${t('general.all-rights-reserved')}`,
    showSupportLink = true,
    customStyles = {},
  } = config || {};

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 3,
        textAlign: 'center',
        ...customStyles,
      }}
    >
      <img
        src={widgetConfig.theme == 'light' ? logoDark : logoWhite}
        alt={' OCS - Sports Data WareHouse'}
        style={{ height: 30, marginRight: 4 }}
      />
      <Typography variant="body2" color="text.secondary">
        {text}
        {showSupportLink && (
          <>
            {' '}
            | {''}
            <Link href="https://olympics.com/" target="_blank" rel="noopener" underline="hover">
              OCS - Sports Data WareHouse
            </Link>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default Footer;
