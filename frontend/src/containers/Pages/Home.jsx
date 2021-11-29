import React, { useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
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
import { SnackBar } from "../../components/Snackbars/Snackbar"
// Image
import MainImage from "../../images/MainImage.png";


export const Home = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [sleepDebtState, sleepDebtDispatch] = useReducer(sleepDebtReducer, sleepDebtInitialState);

  // 睡眠負債を取得する
  const SleepDebt = () => {
    sleepDebtDispatch({ type: 'fetching' })
    fetchSleepDebt(authState.loginUser.id)
      .then(data => {
        { // 睡眠負債のケース
          data.sleep_debt &&
            sleepDebtDispatch({
              type: 'fetchSuccess',
              payload: data.sleep_debt
            })
        }
        { // 余剰睡眠のケース
          data.sleep_saving &&
            sleepDebtDispatch({
              type: 'fetchSuccess',
              payload: data.sleep_saving
            })
        }
      })
  }

  // ログイン時のみ実行
  useEffect(() => {
    authState.loggedIn && SleepDebt()
  }, [authState.loggedIn])


  return (
    <>
      <Grid container sx={{
        p: 2,
        maxWidth: 1200,
        alignItems: 'center',
      }}>
        {!authState.loggedIn &&
          <Grid item xs={12} sm={6} sx={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Box sx={{ textAlign: 'center', }} >
              <Typography variant="h5" component="div" >
                <Box sx={{ letterSpacing: 4 }}>"睡眠負債"の返済を手助けする救済サービス</Box>
              </Typography>
              <Typography variant="h1" component="div" >
                <Box sx={{ letterSpacing: 6, my: 2 }}>睡眠補完計画</Box>
              </Typography>
            </Box>
            <Box sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'space-evenly',
            }}>
              <Button onClick={() => dialogDispatch({ type: 'signup' })}>
                新規登録
              </Button>
              <Button onClick={() => dialogDispatch({ type: 'login' })}>
                ログイン
              </Button>
            </Box>
          </Grid>
        }
        {authState.loggedIn &&
          <Grid item xs={12} sm={6} sx={{
            alignItems: "center",
            justifyContent: 'center',
          }}>
            <SleepInfo
              userName={authState.loginUser.name}
              sleepDebt={sleepDebtState.sleepDebt}
              sleepSaving={sleepDebtState.sleepSaving}
            />
          </Grid>
        }
        <Grid item xs={12} sm={6} sx={{
          alignItems: "center",
          justifyContent: 'center',
        }}>
          <Box>
            <img src={MainImage}
              alt="main iamge"
              style={{ width: 600 }}
            />
          </Box>
        </Grid>
      </Grid>

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
  )
}
