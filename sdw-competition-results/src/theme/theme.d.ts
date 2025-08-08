/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

import { CSSProperties } from 'react';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1bold: CSSProperties;
    quote: CSSProperties;
    deck: CSSProperties;
    footerBold: CSSProperties;
    title1: CSSProperties; // No '?'
    title2: CSSProperties; // No '?'
    title3: CSSProperties; // No '?'
    headline1: CSSProperties; // No '?'
    headline2: CSSProperties; // No '?'
    headline3: CSSProperties; // No '?'
    headline4: CSSProperties; // No '?'
    body2Bold: CSSProperties; // No '?'
    caption1Bold: CSSProperties; // No '?'
    caption2: CSSProperties; // No '?'
    buttonSmall: CSSProperties; // No '?'
  }
  interface Palette {
    olympics: {
      general: {
        surfaceVariant: string;
        fixedNavStroke: string;
      };
      button: {
        hover: string;
        iconSelected: string;
        disabled: string;
      };
      input: {
        default: string;
        outline: string;
        disabled: string;
        onDisabled: string;
      };
      icon: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      controls: {
        off: string;
      };
      semantic: {
        errorOnContainer: string;
        errorContainer: string;
        successOnContainer: string;
        successContainer: string;
        warningOnContainer: string;
        warningContainer: string;
      };
      base: {
        brand: {
          brandBlue: string;
          brandYellow: string;
          brandGreen: string;
          brandRed: string;
        };
        neutral: {
          black: string;
          grey900: string;
          grey800: string;
          grey700: string;
          grey600: string;
          grey500: string;
          grey400: string;
          grey300: string;
          grey200: string;
          grey100: string;
          grey50: string;
          white: string;
        };
        medals: {
          textBronze: string;
          textSilver: string;
          textGold: string;
        };
      };
    };
  }
  interface TypographyVariantsOptions {
    // These should mostly mirror TypographyVariants, but with optional '?'
    // if you don't *always* provide them in createTheme.
    body1bold?: CSSProperties;
    quote?: CSSProperties;
    deck?: CSSProperties;
    footerBold?: CSSProperties;
    title1?: CSSProperties;
    title2?: CSSProperties;
    title3?: CSSProperties;
    headline1?: CSSProperties;
    headline2?: CSSProperties;
    headline3?: CSSProperties;
    headline4?: CSSProperties;
    body2Bold?: CSSProperties;
    caption1Bold?: CSSProperties;
    caption2?: CSSProperties;
    buttonSmall?: CSSProperties;
  }
  interface PaletteOptions {
    olympics?: Palette['olympics'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // All properties here MUST be 'true' for custom variants,
    // or 'false' if you're disabling a default MUI variant.
    // They are NOT the style properties themselves.
    quote: true; // <-- FIX 2: Changed to 'true'
    deck: true; // <-- FIX 2
    footnoteBold: true; // <-- FIX 2
    title1: true; // <-- FIX 2
    title2: true; // <-- FIX 2
    title3: true; // <-- FIX 2
    headline1: true; // <-- FIX 2
    headline2: true; // <-- FIX 2
    headline3: true; // <-- FIX 2
    headline4: true; // <-- FIX 2
    body1Bold: true; // <-- FIX 2
    body2Bold: true; // <-- FIX 2
    caption1Bold: true; // <-- FIX 2
    caption2: true; // <-- FIX 2
    buttonSmall: true; // <-- FIX 2
  }
}
