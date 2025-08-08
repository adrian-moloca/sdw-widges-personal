import { WidgetMedia } from './WidgetMedia';
import { WidgetDisplay } from './WidgetDisplay';
import { WidgetTypography } from './WidgetTypography';
import { WidgetVisibility } from './WidgetVisibility';

// types/WidgetConfig.ts
export type ConfigEnvironment = 'production' | 'staging' | 'development' | 'live';
export type ConfigEntityLevel = 'competition' | 'discipline' | 'event' | 'round' | 'unit';
export interface WidgetConfig {
  apiKey: string;
  environment: ConfigEnvironment;
  language: 'en' | 'es' | 'fr' | 'it' | 'zh' | 'ja' | 'ko' | 'ru' | 'pt' | 'de ' | 'hi ';
  theme: 'light' | 'dark';
  primaryColor?: string; // Optional: custom primary color
  secondaryColor?: string; // Optional: custom secondary color
  disciplineUrl?: string;
  visibility?: WidgetVisibility;
  dataDisplay?: WidgetDisplay;
  typography?: WidgetTypography;
  media?: WidgetMedia[];
  entityLevel: ConfigEntityLevel;
  entityId: string;

  getToken?: () => Promise<string>;
  onEvent?: (event: string, payload?: any) => void;
  onClickUnit?: (event: string, payload?: any) => void;
  onClickAthlete?: (event: string, payload?: any) => void;
  onClickTeam?: (event: string, payload?: any) => void;
  onClickOrganisation?: (event: string, payload?: any) => void;
  onClickOutside?: () => void;
  header?: {
    title?: string;
    showIcon?: boolean;
  };
  stats?: {
    enabled?: boolean;
    showLabels?: boolean;
    highlightColor?: string;
  };
  footer?: {
    text?: string;
    showSupportLink?: boolean;
  };
  button?: {
    enabled?: boolean;
    text?: string;
    variant?: 'contained' | 'outlined' | 'text';
  };
  layout?: {
    padding?: number;
    spacing?: number;
    borderRadius?: number;
  };
}
