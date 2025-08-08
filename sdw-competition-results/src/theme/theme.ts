import { createTheme } from '@mui/material';
import { fonts } from './fonts';
import { layout } from './layout';
import { WidgetTypography } from 'types/WidgetTypography';
import { createOlympicPalette } from './helpers';

const baseTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  defaultColorScheme: 'light',
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0, // Still required by MUI, even if not used
      sm: 768, // small starts at 768
      md: 1024, // medium starts at 1024
      lg: 1440, // large starts at 1440
      xl: 1600, // optional: define >1440 explicitly
    },
  },
});
export const getTheme = (
  mode: 'light' | 'dark',
  primaryColor: string | undefined,
  secondaryColor: string | undefined,
  typography?: WidgetTypography
) => {
  return createTheme(baseTheme, {
    palette: createOlympicPalette(mode, primaryColor, secondaryColor),
    typography: {
      fontFamily: typography?.body1?.fontFamily ?? fonts.families.base,
      h1: {
        fontFamily: typography?.h1?.fontFamily ?? fonts.families.headline,
        fontWeight: typography?.h1?.fontWeight ?? 'normal',
        fontSize: typography?.h1?.fontSize ?? fonts.sizes.title1.desktop,
        lineHeight: typography?.h1?.lineHeight ?? fonts.lineHeights.title1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title1.mobile,
          lineHeight: fonts.lineHeights.title1.mobile,
        },
      },
      h2: {
        fontFamily: typography?.h2?.fontFamily ?? fonts.families.headline,
        fontWeight: typography?.h2?.fontWeight ?? 'normal',
        fontSize: typography?.h2?.fontSize ?? fonts.sizes.title2.desktop,
        lineHeight: typography?.h2?.lineHeight ?? fonts.lineHeights.title2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title2.mobile,
          lineHeight: fonts.lineHeights.title2.mobile,
        },
      },
      h3: {
        fontFamily: typography?.h3?.fontFamily ?? fonts.families.headline,
        fontWeight: typography?.h3?.fontWeight ?? 'bold',
        fontSize: typography?.h3?.fontSize ?? fonts.sizes.title3.desktop,
        lineHeight: typography?.h3?.lineHeight ?? fonts.lineHeights.title3.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title3.mobile,
          lineHeight: fonts.lineHeights.title3.mobile,
        },
      },
      h4: {
        fontFamily: typography?.h4?.fontFamily ?? fonts.families.base,
        fontWeight: typography?.h4?.fontWeight ?? 'bold',
        fontSize: typography?.h4?.fontSize ?? fonts.sizes.headline1.desktop,
        lineHeight: typography?.h4?.lineHeight ?? fonts.lineHeights.headline1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline1.mobile,
          lineHeight: fonts.lineHeights.headline1.mobile,
        },
      },
      h5: {
        fontFamily: typography?.h5?.fontFamily ?? fonts.families.base, // Uses Olympic Sans for Headline 3
        fontWeight: typography?.h5?.fontWeight ?? 'bold',
        fontSize: typography?.h5?.fontSize ?? fonts.sizes.headline2.desktop,
        lineHeight: typography?.h5?.lineHeight ?? fonts.lineHeights.headline2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline2.mobile,
          lineHeight: fonts.lineHeights.headline2.mobile,
        },
      },
      h6: {
        fontFamily: typography?.h6?.fontFamily ?? fonts.families.base, // Uses Olympic Sans for Headline 4
        fontWeight: typography?.h6?.fontWeight ?? 'bold',
        fontSize: typography?.h6?.fontSize ?? fonts.sizes.headline3.desktop,
        lineHeight: typography?.h6?.lineHeight ?? fonts.lineHeights.headline3.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline3.mobile,
          lineHeight: fonts.lineHeights.headline3.mobile,
        },
      },
      h7: {
        fontFamily: typography?.h6?.fontFamily ?? fonts.families.base, // Uses Olympic Sans for Headline 4
        fontWeight: typography?.h6?.fontWeight ?? 'bold',
        fontSize: typography?.h6?.fontSize ?? fonts.sizes.headline4.desktop,
        lineHeight: typography?.h6?.lineHeight ?? fonts.lineHeights.headline4.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline4.mobile,
          lineHeight: fonts.lineHeights.headline4.mobile,
        },
      },
      subtitle1: {
        fontFamily: fonts.families.base,
        fontWeight: 'normal',
        fontSize: fonts.sizes.footer.desktop,
        lineHeight: fonts.lineHeights.footer.desktop,
        letterSpacing: '0',
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.footer.mobile,
          lineHeight: fonts.lineHeights.footer.mobile,
        },
      },
      subtitle2: {
        fontFamily: fonts.families.base,
        fontWeight: 'bold',
        fontSize: fonts.sizes.footer.mobile,
        lineHeight: fonts.lineHeights.footer.mobile,
        letterSpacing: '0',
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.footer.mobile,
          lineHeight: fonts.lineHeights.footer.mobile,
        },
      },
      body1: {
        fontFamily: typography?.body1?.fontFamily ?? fonts.families.base,
        fontWeight: typography?.body1?.fontWeight ?? 'normal',
        fontSize: typography?.body1?.fontSize ?? fonts.sizes.body1.desktop,
        lineHeight: typography?.body1?.lineHeight ?? fonts.lineHeights.body1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.body1.mobile,
          lineHeight: fonts.lineHeights.body1.mobile,
        },
      },

      body2: {
        fontFamily: typography?.body2?.fontFamily ?? fonts.families.base,
        fontWeight: typography?.body2?.fontWeight ?? 'normal',
        fontSize: typography?.body2?.fontSize ?? fonts.sizes.body2.desktop,
        lineHeight: typography?.body2?.lineHeight ?? fonts.lineHeights.body2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.body2.mobile,
          lineHeight: fonts.lineHeights.body2.mobile,
        },
      },

      caption: {
        fontFamily: typography?.caption?.fontFamily ?? fonts.families.base,
        fontWeight: 'normal',
        fontSize: typography?.caption?.fontSize ?? fonts.sizes.caption1.desktop,
        lineHeight: typography?.caption?.lineHeight ?? fonts.lineHeights.caption1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.caption1.mobile,
          lineHeight: fonts.lineHeights.caption1.mobile,
        },
      },

      button: {
        fontFamily: typography?.body1?.fontFamily ?? fonts.families.base,
        fontWeight: 'bold',
        fontSize: typography?.button?.fontSize ?? fonts.sizes.buttonL.desktop,
        lineHeight: typography?.button?.lineHeight ?? fonts.lineHeights.buttonL.desktop,
        letterSpacing: 0,
        textTransform: 'none',
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.buttonL.mobile,
          lineHeight: fonts.lineHeights.buttonL.mobile,
        },
      },

      footer: {
        fontFamily: fonts.families.base,
        fontWeight: 'bold',
        fontSize: fonts.sizes.footer.desktop,
        lineHeight: fonts.lineHeights.footer.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.footer.mobile,
          lineHeight: fonts.lineHeights.footer.mobile,
        },
      },
      // --- Custom Variants ---
      body1bold: {
        fontFamily: typography?.body1?.fontFamily ?? fonts.families.base,
        fontWeight: 'bold',
        fontSize: typography?.body1?.fontSize ?? fonts.sizes.body1.desktop,
        lineHeight: typography?.body1?.lineHeight ?? fonts.lineHeights.body1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.body1.mobile,
          lineHeight: fonts.lineHeights.body1.mobile,
        },
      },
      quote: {
        fontFamily: fonts.families.secondary,
        fontWeight: 'normal',
        fontSize: fonts.sizes.quote.desktop,
        lineHeight: fonts.lineHeights.quote.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.quote.mobile,
          lineHeight: fonts.lineHeights.quote.mobile,
        },
      },
      deck: {
        fontFamily: fonts.families.base,
        fontWeight: 'bold',
        fontSize: fonts.sizes.deck.desktop,
        lineHeight: fonts.lineHeights.deck.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.deck.mobile,
          lineHeight: fonts.lineHeights.deck.mobile,
        },
      },
      // Titles (mapped to h1, h2, h3 implicitly via default overrides below)
      title1: {
        fontFamily: typography?.h1?.fontFamily ?? fonts.families.headline, // Olympic Headline
        fontWeight: 'normal',
        fontSize: typography?.h1?.fontSize ?? fonts.sizes.title1.desktop,
        lineHeight: typography?.h1?.lineHeight ?? fonts.lineHeights.title1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title1.mobile,
          lineHeight: fonts.lineHeights.title1.mobile,
        },
      },
      title2: {
        fontFamily: typography?.h2?.fontFamily ?? fonts.families.headline, // Olympic Headline
        fontWeight: 'normal',
        fontSize: typography?.h2?.fontSize ?? fonts.sizes.title2.desktop,
        lineHeight: typography?.h2?.lineHeight ?? fonts.lineHeights.title2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title2.mobile,
          lineHeight: fonts.lineHeights.title2.mobile,
        },
      },
      title3: {
        fontFamily: typography?.h3?.fontFamily ?? fonts.families.headline, // Olympic Headline
        fontWeight: 'normal',
        fontSize: typography?.h3?.fontSize ?? fonts.sizes.title3.desktop,
        lineHeight: typography?.h3?.lineHeight ?? fonts.lineHeights.title3.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.title3.mobile,
          lineHeight: fonts.lineHeights.title3.mobile,
        },
      },

      // Headlines (mapped to h3, h4, h5, h6 implicitly via default overrides below)
      headline1: {
        fontFamily: typography?.h3?.fontFamily ?? fonts.families.secondary, // Olympic Serif
        fontWeight: 'bold',
        fontSize: typography?.h3?.fontSize ?? fonts.sizes.headline1.desktop,
        lineHeight: typography?.h3?.lineHeight ?? fonts.lineHeights.headline1.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline1.mobile,
          lineHeight: fonts.lineHeights.headline1.mobile,
        },
      },
      headline2: {
        fontFamily: typography?.h4?.fontFamily ?? fonts.families.base, // Olympic Sans
        fontWeight: 'bold',
        fontSize: typography?.h4?.fontSize ?? fonts.sizes.headline2.desktop,
        lineHeight: typography?.h4?.lineHeight ?? fonts.lineHeights.headline2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline2.mobile,
          lineHeight: fonts.lineHeights.headline2.mobile,
        },
      },
      headline3: {
        fontFamily: typography?.h5?.fontFamily ?? fonts.families.base, // Olympic Sans
        fontWeight: 'bold',
        fontSize: typography?.h5?.fontSize ?? fonts.sizes.headline3.desktop,
        lineHeight: typography?.h5?.lineHeight ?? fonts.lineHeights.headline3.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline3.mobile,
          lineHeight: fonts.lineHeights.headline3.mobile,
        },
      },
      headline4: {
        fontFamily: typography?.h6?.fontFamily ?? fonts.families.base, // Olympic Sans
        fontWeight: 'bold',
        fontSize: typography?.h6?.fontSize ?? fonts.sizes.headline4.desktop,
        lineHeight: typography?.h6?.lineHeight ?? fonts.lineHeights.headline4.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.headline4.mobile,
          lineHeight: fonts.lineHeights.headline4.mobile,
        },
      },
      caption2: {
        fontFamily: fonts.families.base, // Olympic Sans
        fontWeight: 'bold',
        fontSize: fonts.sizes.caption2.desktop,
        lineHeight: fonts.lineHeights.caption2.desktop,
        letterSpacing: 0,
        [baseTheme.breakpoints.down('sm')]: {
          fontSize: fonts.sizes.caption2.mobile,
          lineHeight: fonts.lineHeights.caption2.mobile,
        },
      },
    },
    components: {
      MuiListSubheader: {
        styleOverrides: {
          root: {
            fontSize: fonts.sizes.body2.desktop,
            fontWeight: '400!important',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: layout.radius.md,
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            borderRadius: layout.radius.md,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: layout.radius.sm,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: baseTheme.spacing(2),
            '&:last-child': {
              paddingBottom: baseTheme.spacing(2),
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: layout.radius.sm,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            fontSize: fonts.sizes.body1.desktop,
            fontFamily: fonts.families.base,
            fontWeight: '400!important',
          },
          primary: {
            fontSize: fonts.sizes.body1.desktop,
            fontFamily: fonts.families.base,
            fontWeight: '400!important',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: fonts.families.base,
            fontSize: fonts.sizes.buttonL.desktop,
            fontWeight: 'normal',
            borderRadius: baseTheme.shape.borderRadius || 4, // Apply default or custom border radius
            textTransform: 'none', // Buttons typically not uppercase in design systems
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginTop: '2px',
            marginLeft: '4px',
            lineHeight: '1.1',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '3px 4px',
            fontSize: fonts.sizes.body1.desktop,
            fontFamily: fonts.families.base,
            lineHeight: '1!important',
          },
          sizeSmall: {
            padding: '2px 6px',
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          labelContainer: {
            '.MuiStepLabel-label': {
              fontFamily: fonts.families.headline,
              fontSize: '1.2rem',
            },
          },
          iconContainer: {
            '.MuiStepIcon-text': {
              fontFamily: fonts.families.headline,
              fontSize: fonts.sizes.body1.desktop,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 'normal',
            fontSize: fonts.sizes.footer.desktop,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            '.MuiTypography-caption': {
              opacity: 0.6,
              //fontSize: '8px!important',
              //color: 'text.secondary',
            },
          },
        },
      },
    },
  });
};
