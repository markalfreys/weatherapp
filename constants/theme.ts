
import { DefaultTheme } from 'react-native-paper';

export const theme = {
    colors: {
      primary: '#6200ea',
      secondary: '#03dac6',
      background: '#ffffff',
      text: '#000000',
    },
    fonts: {
      regular: 'Poppins-Regular',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSizes: {
      small: 14,
      medium: 18,
      large: 24,
    },
};


export const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F5F5F5',
    secondary: '#ffffffb2'
  },
};
