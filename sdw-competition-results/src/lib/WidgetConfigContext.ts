import { createContext, useContext } from 'react';
import { WidgetConfig } from '../types/WidgetConfig';

export const WidgetConfigContext = createContext<WidgetConfig | undefined>(undefined);

export const useWidgetConfig = (): WidgetConfig => {
  const context = useContext(WidgetConfigContext);
  if (!context) {
    throw new Error('useWidgetConfig must be used inside WidgetConfigProvider');
  }
  return context;
};
