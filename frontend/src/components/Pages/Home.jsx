import React, { useContext, useReducer } from "react";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Component
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";
import { SnackBar } from "../../components/Snackbars/Snackbar";
import { HomeMessage } from "../../components/Items/HomeMessage";
import { HomeRegister } from "../../components/Items/HomeRegister";
// Image
import MainImage from "../../images/MainImage.png";

const Container = styled('box')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  maxWidth: 1000,
  paddingTop: 10,
}));

export const Home = () => {
  const { authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  return (
    <>
      <Container>
        <Box sx={{ maxWidth: 350 }}>
          <CardMedia
            alt='MainImage'
            component='img'
            image={MainImage}
            sx={{ pb: 3, width: '100%' }}
          />
        </Box>
        <Box>
          <HomeRegister
            handleOpenLogin={() => dialogDispatch({ type: 'login' })}
            handleOpenSignup={() => dialogDispatch({ type: 'signup' })}
          />
        </Box>
        <HomeMessage />
      </Container>
      <SignUpDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.signup}
      />
      <LogInDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        handlePasswordReset={() => dialogDispatch({ type: 'passwordReset' })}
        open={dialogState.login}
      />
      <PasswordResetDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.passwordReset}
      />
      <SnackBar handleClose={() => authDispatch({ type: 'closeSnackbar' })} />
    </>
  );
}
