import React, { useEffect, useReducer, createContext } from 'react';
import './App.css';
// styles
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// api
import { fetchLoggedIn } from './apis/sessions';
// reducer
import { authInitialState, authReducer } from './reducer/AuthReducer'
// コンテイナー
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AuthContext.Provider value={{ authState, authDispatch }}>
        <Layout />
      </AuthContext.Provider>
    </Box>
  );
}
