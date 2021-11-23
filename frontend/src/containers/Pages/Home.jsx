import React, { useContext, useReducer } from "react";
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@mui/material/Grid";
// Icon
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Component
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";
import { Typography } from "@mui/material";
// Image
import { MainImage } from "../../images/MainImage.png";

export const Home = ({
  loggedIn,
  handleLogin,
  loginUser,
}) => {
  const { authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  // ホームへ返す
  return (
    <>
      <Grid container sx={{
        p: 2,
        maxWidth: 1000
      }}>
        {!loggedId &&
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
        {loggedId &&
          <Grid item xs={12} sm={7} sx={{
            alignItems: "center",
            justifyContent: 'center',
            maxWidth: 500,
          }}>
            <h3>{loginUser.name}さんの睡眠負債は</h3>
            <div><h1><b>100</b></h1><h3>時間</h3></div>
            <h3>もっと睡眠をとり</h3>
            <h3>着実に返済していきましょう</h3>
          </Grid>
        }
        <Grid item xs={12} sm={7} sx={{
          alignItems: "center",
          justifyContent: 'center',
          maxWidth: 500,
        }}>
          <img src={MainCoverImage} alt="main iamge" />
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
