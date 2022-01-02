import React, { useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
// Api
import { fetchSleepDebt } from "../../apis/diaries";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { sleepDebtReducer, sleepDebtInitialState } from "../../reducer/SleepDebtReducer";
// Component
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";
import { SleepInfo } from "../../components/UserInfomation/SleepInfo"
import { SnackBar } from "../../components/Snackbars/Snackbar";
import { HomeMessage } from "../../components/Items/HomeMessage";
// Image
import MainImage from "../../images/MainImage.png";

const Container = styled('box')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 1000,
  alignItems: 'center'
}));

export const Home = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [sleepDebtState, sleepDebtDispatch] = useReducer(sleepDebtReducer, sleepDebtInitialState);

  // 睡眠負債を取得する
  const SleepDebt = () => {
    sleepDebtDispatch({ type: 'fetching' })
    fetchSleepDebt(authState.loginUser.id)
      .then(data => {
        // 睡眠負債のケース
        data.sleep_debt && (
          sleepDebtDispatch({
            type: 'fetchSuccess',
            payload: { sleepDebt: data.sleep_debt }
          })
        );
        // 余剰睡眠のケース
        data.sleep_saving && (
          sleepDebtDispatch({
            type: 'fetchSuccess',
            payload: { sleepSaving: data.sleep_saving }
          })
        );
      });
  }
  // ログイン時のみ実行
  useEffect(() => {
    authState.loggedIn && SleepDebt();
  }, [])

  return (
    <>
      <Container>
        {authState.loggedIn
          ? <SleepInfo
            userName={authState.loginUser.name}
            sleepDebt={sleepDebtState.sleepDebt}
            sleepSaving={sleepDebtState.sleepSaving}
          />
          : <HomeMessage
            handleOpenLogin={() => dialogDispatch({ type: 'login' })}
            handleOpenSignup={() => dialogDispatch({ type: 'signup' })}
          />
        }
        <Box sx={{ maxWidth: 420 }}>
          <CardMedia
            alt='MainImage'
            component='img'
            image={MainImage}
            sx={{ p: 1, mx: 3, width: '100%' }}
          />
        </Box>
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
