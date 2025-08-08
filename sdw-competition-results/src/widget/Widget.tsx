import 'assets/scss/main.scss';
import 'assets/scss/global.css';
import { deepmerge } from '@mui/utils';
import { defaultConfig } from 'config/defaultConfig';
import { WidgetConfig } from 'types/WidgetConfig';
import Footer from '../components/Footer';
import { AxiosContext, createAxiosClient } from 'lib/axiosClient';
import { createQueryClient } from 'lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { initializeI18n } from 'i18n/i18nInit';
import { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeWrapper from 'theme/ThemeWrapper';
import { WidgetConfigContext } from 'lib/WidgetConfigContext';
import { WidgetRef } from 'types/WidgetRef';
import { Provider } from 'react-redux';
import { store } from 'store';
import MuiXLicense from 'components/MuiLicense/MuiLicense';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import WidgetRoutes from './WidgetRoutes';
initializeI18n();

const Widget = forwardRef<WidgetRef, { config: Partial<WidgetConfig> }>(({ config }, ref) => {
  const fullConfig = deepmerge(defaultConfig, config);
  const axiosInstance = createAxiosClient(fullConfig.apiKey, fullConfig.environment);
  const queryClient = createQueryClient();
  const { i18n } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  // Handle language change when `config.language` is updated
  useEffect(() => {
    if (i18n.language !== config.language) {
      i18n.changeLanguage(config.language); // Change language only if it's different
    }
  }, [config.language, i18n]); // Only run when config.language changes

  useImperativeHandle(ref, () => ({
    refresh: () => {
      queryClient.invalidateQueries();
      fullConfig.onEvent?.('refresh');
    },
    reset: () => {
      queryClient.clear();
      fullConfig.onEvent?.('reset');
    },
    getToken: async () => {
      if (fullConfig.getToken) return await fullConfig.getToken();
      return fullConfig.apiKey;
    },
  }));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        fullConfig.onClickOutside?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <MuiXLicense />
          <div ref={containerRef}>
            <ThemeWrapper
              mode={config.theme ?? 'light'}
              primaryColor={config.primaryColor}
              secondaryColor={config.secondaryColor}
              typography={config.typography ?? {}}
            >
              <WidgetConfigContext.Provider value={fullConfig}>
                <AxiosContext.Provider value={axiosInstance}>
                  <QueryClientProvider client={queryClient}>
                    <WidgetRoutes />
                    <Footer />
                  </QueryClientProvider>
                </AxiosContext.Provider>
              </WidgetConfigContext.Provider>
            </ThemeWrapper>
          </div>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
});
export default Widget;
