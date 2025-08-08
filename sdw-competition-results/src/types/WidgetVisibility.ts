/**
 * Controls the visibility of various sections and UI elements within a widget.
 *
 * Each property determines whether a specific element should be shown or hidden.
 * By default, all sections are visible unless explicitly disabled.
 */
export interface WidgetVisibility {
  /**
   * Show or hide result status indicators (e.g., Cancelled, Finished).
   * @default true
   */
  resultStatus?: boolean;

  /**
   * If true, hides the Medals section.
   * @default false
   */
  disableMedals?: boolean;

  /**
   * If true, hides the Structure section.
   * @default false
   */
  disableStructure?: boolean;

  /**
   * If true, hides the Results section.
   * @default false
   */
  disableResults?: boolean;

  /**
   * If true, hides the Records section.
   * @default false
   */
  disableRecords?: boolean;

  /**
   * If true, hides the Rankings section.
   * @default false
   */
  disableRankings?: boolean;

  /**
   * If true, hides the Schedule section.
   * @default false
   */
  disableSchedule?: boolean;

  /**
   * If true, hides the widget header.
   * @default false
   */
  disableHeader?: boolean;

  /**
   * If true, hides the widget header.
   * @default false
   */
  disableCompetitionSchedule?: boolean;
  disableCompetitionMedals?: boolean;
  disableCompetitionParticipants?: boolean;
  /**
   * If true, hides breadcrumb navigation.
   * @default false
   */
  disableBreadcrumbsNav?: boolean;

  /**
   * Show or hide the footer section.
   * @default true
   */
  footer?: boolean;

  /**
   * Show or hide the internal discipline link.
   * @default true
   */
  disciplineLink?: boolean;

  /**
   * Show or hide section titles (optional future feature).
   * @default true
   */
  sectionTitles?: boolean;

  /**
   * Show or hide the support/help link.
   * @default true
   */
  supportLink?: boolean;
}
