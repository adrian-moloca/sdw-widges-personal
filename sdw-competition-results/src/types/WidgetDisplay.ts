export interface WidgetDisplay {
  defaultRowHeight?: number;
  defaultSecondaryRowHeight?: number;
  defaultColumnHeaderHeight?: number;
  defaultSecondaryColumnHeaderHeight?: number;
  /** Show or hide the calculated order (e.g. overall rank) */
  calculatedOrder?: boolean;
  /** Enable striped row in results data tables */
  enableStripedTables?: boolean;
}
