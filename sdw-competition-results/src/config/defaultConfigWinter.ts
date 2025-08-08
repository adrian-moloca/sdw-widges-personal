import { WidgetConfig } from 'types/WidgetConfig';
import { defaultMedia } from './defaultMedia';

export const defaultConfigWinter: WidgetConfig = {
  apiKey: 'sed-widget',
  environment: 'staging',
  language: 'en',
  theme: 'light',
  dataDisplay: {
    defaultRowHeight: 70,
    defaultSecondaryRowHeight: 40,
    defaultSecondaryColumnHeaderHeight: 46,
    defaultColumnHeaderHeight: 70,
    enableStripedTables: false,
    calculatedOrder: false,
  },
  visibility: {
    resultStatus: false,
  },
  entityLevel: 'competition',
  entityId: 'CMP-358df5fd-bda0-33a3-9687-fb984eb2f03f',
  header: {
    title: 'Welcome to the Widget!',
    showIcon: true,
  },
  stats: {
    enabled: true,
    showLabels: true,
    highlightColor: '#4caf50',
  },
  footer: {
    text: 'Powered by MyWidget',
    showSupportLink: true,
  },
  button: {
    enabled: true,
    text: 'Click me',
    variant: 'contained',
  },
  layout: {
    padding: 16,
    spacing: 2,
    borderRadius: 8,
  },

  media: defaultMedia,
};
