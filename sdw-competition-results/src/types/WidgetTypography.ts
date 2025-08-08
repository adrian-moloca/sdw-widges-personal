export interface WidgetTypographyVariant {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface WidgetTypography {
  h1?: WidgetTypographyVariant;
  h2?: WidgetTypographyVariant;
  h3?: WidgetTypographyVariant;
  h4?: WidgetTypographyVariant;
  h5?: WidgetTypographyVariant;
  h6?: WidgetTypographyVariant;
  subtitle1?: WidgetTypographyVariant;
  subtitle2?: WidgetTypographyVariant;
  body1?: WidgetTypographyVariant;
  body2?: WidgetTypographyVariant;
  caption?: WidgetTypographyVariant;
  overline?: WidgetTypographyVariant;
  button?: WidgetTypographyVariant;
}
