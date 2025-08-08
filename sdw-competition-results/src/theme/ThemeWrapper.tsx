import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { WidgetTypography } from 'types/WidgetTypography';
interface ThemeWrapperProps {
  mode: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  typography?: WidgetTypography;
  children: React.ReactNode;
}

// ThemeWrapper component to wrap children with the applied theme
const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  mode,
  primaryColor,
  secondaryColor,
  typography,
  children,
}) => {
  const theme = getTheme(mode, primaryColor, secondaryColor, typography);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This applies the baseline CSS styles */}
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
