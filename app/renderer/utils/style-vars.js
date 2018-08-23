const colors = {
  veryLightGray:     '#EEFFFF',
  lightGray:         '#B2CCD6',
  gray:              '#373b41',
  darkGray:          '#282a2e',
  darkerGray:        '#263238',
  darkestGray:       '#1E2B30',
  green:             '#C3E88D',
  teal:              '#009688',
  lightTeal:         '#73d1c8',
  cyan:              '#89DDF3',
  blue:              '#82AAFF',
  indigo:            '#7986CB',
  purple:            '#C792EA',
  pink:              '#FF5370',
  red:               '#F07178',
  strongOrange:      '#F78C6A',
  orange:            '#FFCB6B',
  lightOrange:       '#FFE082',
};


export default {
  ...colors,

  defaultFontFamily: '"Roboto", sans-serif',
  primaryTextColor: colors.veryLightGray,
  tertiaryTextColor: 'rgba(238, 255, 255, 0.5)',

  basePadding: '16px',
  baseBorderRadius: '3px',
};
