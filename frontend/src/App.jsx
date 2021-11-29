import React, { useEffect, useReducer, createContext } from 'react';
import './App.css';
// Style
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styled/theme'
import { ThemeProvider } from '@material-ui/core/styles';
// Api
import { fetchLoggedIn } from './apis/sessions';
// Reducer
import { authInitialState, authReducer } from './reducer/AuthReducer'
// Container
import { Layout } from './containers/Layout';

export const AuthContext = createContext()

export default function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)

  useEffect(() => {
    fetchLoggedIn()
      .then(data => {
        if (data.logged_in && authState.loggedIn === false) {
          authDispatch({
            type: 'login',
            payload: data.user,
          })
        } else if (!data.logged_in && authState.loggedIn === true) {
          authDispatch({
            type: 'logout',
          })
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Layout />
        </Box>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
