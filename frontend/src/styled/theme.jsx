import { palette } from "@material-ui/system";
import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
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
    },
    MyThemeComponents: {
      styleOverrides: {
        root: {
          color: palette.primary
        },
        primary: {
          color: '#0080FF'
        },
        variants: [
          {
            props: { variant: 'contained', color: "error" },
            style: {
              background: '#ff9999',
              borderRadius: 4,
              height: 30,
              padding: '15px 20px',
            }
          }
        ]
      },
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
  })
);
