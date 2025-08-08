import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { WidgetEventType } from '../types/WidgetEventType';

export const useWidgetEvents = () => {
  const config = useWidgetConfig();

  const trigger = (event: WidgetEventType, payload?: any) => {
    // Specific event handlers
    switch (event) {
      case WidgetEventType.UNIT_CLICKED:
        config.onClickUnit?.(event, payload);
        break;
      case WidgetEventType.ATHLETE_CLICKED:
        config.onClickAthlete?.(event, payload);
        break;
      case WidgetEventType.TEAM_CLICKED:
        config.onClickTeam?.(event, payload);
        break;
      case WidgetEventType.ORGANISATION_CLICKED:
        config.onClickOrganisation?.(event, payload);
        break;
      case WidgetEventType.OUTSIDE_CLICK:
        config.onClickOutside?.();
        break;
    }

    // Generic catch-all handler
    config.onEvent?.(event, payload);
  };

  return { trigger };
};
