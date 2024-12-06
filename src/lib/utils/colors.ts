export const themeColors = {
  light: {
    primary: {
      light: '#787EFF',
      main: '#666CFF',
      dark: '#5A5FE0',
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F4F5FA',
    },
    success: {
      light: '#56CA00',
      main: '#40B13C',
      dark: '#2D9437',
    },
    error: {
      light: '#FF4C51',
      main: '#FF4D49',
      dark: '#E04440',
    },
    warning: {
      light: '#FFB826',
      main: '#FFA319',
      dark: '#E08E16',
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
    },
    text: {
      primary: '#3A3541DE',
      secondary: '#3A354199',
      disabled: '#3A354161',
    },
    divider: '#3A354114',
    border: '#3A354114',
  },
  dark: {
    primary: {
      light: '#787EFF',
      main: '#666CFF',
      dark: '#5A5FE0',
    },
    secondary: {
      light: '#9AA1B1',
      main: '#8A919F',
      dark: '#797F8A',
    },
    background: {
      paper: '#2F3349',
      default: '#25293C',
    },
    success: {
      light: '#56CA00',
      main: '#40B13C',
      dark: '#2D9437',
    },
    error: {
      light: '#FF4C51',
      main: '#FF4D49',
      dark: '#E04440',
    },
    warning: {
      light: '#FFB826',
      main: '#FFA319',
      dark: '#E08E16',
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
    },
    text: {
      primary: '#E7E3FCDE',
      secondary: '#E7E3FC99',
      disabled: '#E7E3FC61',
    },
    divider: '#E7E3FC14',
    border: '#E7E3FC14',
  },
};

export type ThemeColor = keyof typeof themeColors.light;
export type ColorShade = 'light' | 'main' | 'dark';

export function getThemeColor(color: ThemeColor, shade: ColorShade = 'main', theme: 'light' | 'dark' = 'light'): string {
  return themeColors[theme][color][shade];
}