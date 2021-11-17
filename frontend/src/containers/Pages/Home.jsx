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

export const Home = (props) => {
  const { authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  // ホームへ返す
  return (
    <>
      <Box sx={{ overflow: 'hidden' }}>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Skeleton variant="rect" width={400} height={200} />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          my: 2,
        }}
        >
          <Button onClick={() => dialogDispatch({ type: 'signup' })}>
            新規登録
          </Button>
          <Button onClick={() => dialogDispatch({ type: 'login' })}>
            ログイン
          </Button>

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
        </Box>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',

        }}>

          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">日記</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">タイムライン</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">睡眠本</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">ニュース</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">フォロー</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">メッセージ</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">プロフィール</Typography>
            </Button>
          </Grid>

        </Box>

      </Box>
    </>
  )
}
