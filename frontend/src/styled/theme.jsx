import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0288d1'
      },
      background: {
        paper: '#001e3c',
        default: '#001e3c',
      }
    },
    typography: {
      h1: { letterSpacing: '10em' },
      h2: { letterSpacing: '10em' },
      h3: { letterSpacing: '10em' },
      button: {
        textTransform: "none"
      }
    },
    components: {
      MuiButton: {
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
