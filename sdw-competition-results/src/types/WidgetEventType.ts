export enum WidgetEventType {
  UNIT_CLICKED = 'unit_clicked',
  ATHLETE_CLICKED = 'athlete_clicked',
  TEAM_CLICKED = 'team_clicked',
  ORGANISATION_CLICKED = 'organisation_clicked',
  FILTER_APPLIED = 'filter_applied',
  TAB_CHANGED = 'tab_changed',
  MODAL_OPENED = 'modal_opened',
  MODAL_CLOSED = 'modal_closed',
  SEARCH_SUBMITTED = 'search_submitted',
  BUTTON_CLICKED = 'button_clicked',
  ITEM_EXPANDED = 'item_expanded',
  OUTSIDE_CLICK = 'outside_click',

  // Lifecycle/System Events
  WIDGET_LOADED = 'widget_loaded',
  DATA_LOADED = 'data_loaded',
  TOKEN_REFRESHED = 'token_refreshed',
  CONFIG_UPDATED = 'config_updated',
  ERROR_OCCURRED = 'error_occurred',
  LANGUAGE_CHANGED = 'language_changed',
  THEME_CHANGED = 'theme_changed',
}
