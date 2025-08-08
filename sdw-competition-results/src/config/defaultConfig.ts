import { WidgetConfig } from 'types/WidgetConfig';
import { defaultMedia } from './defaultMedia';

export const defaultConfig: WidgetConfig = {
  apiKey: 'sed-widget',
  environment: 'production',
  language: 'en',
  theme: 'light',
  dataDisplay: {
    defaultRowHeight: 70,
    defaultSecondaryRowHeight: 40,
    defaultSecondaryColumnHeaderHeight: 46,
    defaultColumnHeaderHeight: 70,
    enableStripedTables: true,
    calculatedOrder: false,
  },
  entityLevel: 'competition',
  entityId: 'CMP-48a0719c-2d37-3e3d-94c0-539d4e304a1d', //'CMP-358df5fd-bda0-33a3-9687-fb984eb2f03f',
  header: {
    title: 'Welcome to the Widget!',
    showIcon: true,
  },
  onEvent(event, payload) {
    console.log('[INFO] Event:', event, 'Payload:', payload);
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
  visibility: {
    resultStatus: false,
    //disableMedals: true
    //disableSchedule: true,
    //disableHeader: true,
    //disableBreadcrumbsNav: true,
  },
  media: defaultMedia,
};
