// This generates theme variables in the correct shape for the UI
import { chromeLight, chromeDark } from 'react-inspector';
import { opacify } from 'polished';

import { themeVars as lightThemeVarss } from './themes/light-vars';
import { themeVars as darkThemeVarss } from './themes/dark-vars';

import { Theme, color, Color, background, typography } from './base';
import { easing, animation } from './animation';
import { create as createSyntax } from './modules/syntax';

const base: { light: ThemeVars; dark: ThemeVars } = { light: lightThemeVarss, dark: darkThemeVarss };

interface Rest {
  [key: string]: any;
}

interface ThemeVars {
  base?: 'light' | 'dark';

  colorPrimary?: string;
  colorSecondary?: string;

  // UI
  appBg?: string;
  appContentBg?: string;
  appBorderColor?: string;
  appBorderRadius?: number;

  // Typography
  fontBase?: string;
  fontCode?: string;

  // Text colors
  textColor?: string;
  textInverseColor?: string;

  // Toolbar default and active colors
  barTextColor?: string;
  barSelectedColor?: string;
  barBg?: string;

  // Form colors
  inputBg?: string;
  inputBorder?: string;
  inputTextColor?: string;
  inputBorderRadius?: number;

  brandTitle?: string;
  brandUrl?: string;
  brandImage?: string;
}

const createColors = (vars: ThemeVars): Color => ({
  // Changeable colors
  primary: vars.colorPrimary,
  secondary: vars.colorSecondary,
  tertiary: color.tertiary,
  ancillary: color.ancillary,

  // Complimentary
  orange: color.orange,
  gold: color.gold,
  green: color.green,
  seafoam: color.seafoam,
  purple: color.purple,
  ultraviolet: color.ultraviolet,

  // Monochrome
  lightest: color.lightest,
  lighter: color.lighter,
  light: color.light,
  mediumlight: color.mediumlight,
  medium: color.medium,
  mediumdark: color.mediumdark,
  dark: color.dark,
  darker: color.darker,
  darkest: color.darkest,

  // For borders
  border: color.border,

  // Status
  positive: color.positive,
  negative: color.negative,
  warning: color.warning,

  defaultText: vars.textColor || color.darkest,
  inverseText: vars.textInverseColor || color.lightest,
});

const lightSyntaxColors = {
  green1: '#008000',
  red1: '#A31515',
  red2: '#9a050f',
  red3: '#800000',
  red4: '#ff0000',
  gray1: '#393A34',
  cyan1: '#36acaa',
  cyan2: '#2B91AF',
  blue1: '#0000ff',
  blue2: '#00009f',
};

const darkSyntaxColors = {
  green1: '#7C7C7C',
  red1: '#92C379',
  red2: '#9a050f',
  red3: '#A8FF60',
  red4: '#96CBFE',
  gray1: '#EDEDED',
  cyan1: '#C6C5FE',
  cyan2: '#FFFFB6',
  blue1: '#B474DD',
  blue2: '#00009f',
};

export const create = (vars: ThemeVars, rest?: Rest): Theme => {
  const inherit: ThemeVars = { ...vars, ...(base[vars.base] || base.light), ...base.light };

  return {
    base: vars.base,
    color: createColors(inherit),
    background: {
      app: inherit.appBg,
      content: inherit.appContentBg,
      hoverable: vars.base === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(250,250,252,.1)' || background.hoverable,

      positive: background.positive,
      negative: background.negative,
      warning: background.warning,
    },
    typography: {
      fonts: {
        base: inherit.fontBase,
        mono: inherit.fontCode,
      },
      weight: typography.weight,
      size: typography.size,
    },
    animation,
    easing,

    input: {
      border: inherit.inputBorder,
      background: inherit.inputBg,
      color: inherit.inputTextColor,
      borderRadius: inherit.inputBorderRadius,
    },

    // UI
    layoutMargin: 10,
    appBorderColor: inherit.appBorderColor,
    appBorderRadius: inherit.appBorderRadius,

    // Toolbar default/active colors
    barTextColor: inherit.barTextColor,
    barSelectedColor: inherit.barSelectedColor,
    barBg: inherit.barBg,

    // Brand logo/text
    brand: {
      title: inherit.brandTitle,
      url: inherit.brandUrl,
      image: inherit.brandImage,
    },

    code: createSyntax({
      colors: vars.base === 'light' ? lightSyntaxColors : darkSyntaxColors,
      mono: inherit.fontCode,
    }),

    // Addon actions theme
    // API example https://github.com/xyc/react-inspector/blob/master/src/styles/themes/chromeLight.js
    addonActionsTheme: {
      ...(vars.base === 'light' ? chromeLight : chromeDark),

      BASE_FONT_FAMILY: inherit.fontCode,
      BASE_FONT_SIZE: typography.size.s2 - 1,
      BASE_LINE_HEIGHT: '18px',
      BASE_BACKGROUND_COLOR: 'transparent',
      BASE_COLOR: inherit.textColor,
      ARROW_COLOR: opacify(0.2, inherit.appBorderColor),
      ARROW_MARGIN_RIGHT: 4,
      ARROW_FONT_SIZE: 8,
      TREENODE_FONT_FAMILY: inherit.fontCode,
      TREENODE_FONT_SIZE: typography.size.s2 - 1,
      TREENODE_LINE_HEIGHT: '18px',
      TREENODE_PADDING_LEFT: 12,
    },

    ...(rest || {}),
  };
};
