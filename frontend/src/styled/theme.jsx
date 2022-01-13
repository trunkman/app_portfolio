import { createTheme, responsiveFontSizes } from '@mui/material';

const preTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0080FF'
    },
    background: {
      paper: '#001e3c',
      default: '#001e3c',
    }
  },
  typography: {

    h1: { letterSpacing: '.2em', fontWeight: 'bold' },
    h2: { letterSpacing: '.2em', fontWeight: 'bold' },
    h3: { letterSpacing: '.2em', fontWeight: 'bold' },
    h4: { letterSpacing: '.2em', fontWeight: 'bold' },
    h5: { letterSpacing: '.2em', fontWeight: 'bold' },
    h6: { letterSpacing: '.2em', fontWeight: 'bold' },
    subtitle1: { letterSpacing: '.2em', fontWeight: 'bold' },
  },
  MyThemeComponents: {
    MuiTextField: {
      variant: "standard"
    },
    MuiCheckbox: {
      color: "primary"
    },
    MuiRadio: {
      color: "primary"
    },
    MuiSwitch: {
      color: "primary"
    },
  },
});

export const theme = responsiveFontSizes(preTheme);
