import React, { useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
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
// Image
// import { MainImage } from "../../images/MainImage.png";

export const Home = () => {
  const { authState } = useContext(AuthContext);
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

  // ホーム画面を返す
  // 睡眠負債の場合分けは未実装
  return (
    <>
      <Grid container sx={{
        p: 2,
        maxWidth: 1000
      }}>
        {!authState.loggedIn &&
          <Grid item xs={12} sm={5}>
            <h3>"睡眠負債"の返済を手伝う</h3>
            <h3>睡眠救済サービス</h3>
            <h1>Pay Back 睡眠負債</h1>
            <Box sx={{
              alignItems: "center",
              justifyContent: 'center',
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
          <Grid item xs={12} sm={7} sx={{
            alignItems: "center",
            justifyContent: 'center',
            maxWidth: 500,
          }}>
            <SleepInfo
              userName={authState.loginUser.name}
              sleepDebt={sleepDebtState.sleepDebt}
              sleepSaving={sleepDebtState.sleepSaving}
            />
          </Grid>
        }
        <Grid item xs={12} sm={7} sx={{
          alignItems: "center",
          justifyContent: 'center',
          maxWidth: 500,
        }}>
          {/* <image src={MainImage}
                 alt="main iamge"
                 style={{width:500 ,height: 500}}
          /> */}
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
    </>
  )
}
