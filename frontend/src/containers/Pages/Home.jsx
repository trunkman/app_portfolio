import React, { useState, useReducer } from "react";
//styled
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
// reducer
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer'
// コンポーネント
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";

export const Home = (props) => {
  const [openState, dispatch] = useReducer(dialogReducer, dialogInitialState)

  // 返り値：HOME画面
  return (
    <>
      <Box sx={{
        bgcolor: 'grey.300',
        overflow: 'hidden',
        p: 1,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
        }}>
          <Skeleton variant="rect" width={450} height={300} />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Button variant="contained" sx={{ mr: 3 }}
            onClick={() => dispatch({ type: 'signup' })}
          >
            新規登録
          </Button>
          <SignUpDialog
            open={openState.signup}
            handleClose={() => dispatch({ type: 'close' })}
            handleLogIn={props.handleLogIn}
          />
          <Button variant="contained" sx={{ mr: 3 }}
            onClick={() => dispatch({ type: 'login' })}>
            ログイン
          </Button>
          <LogInDialog
            open={openState.login}
            handleClose={() => dispatch({ type: 'close' })}
            handleLogIn={props.handleLogIn}
            handlePasswordReset={() => dispatch({ type: 'passwordReset' })}
          />
          <PasswordResetDialog
            open={openState.passwordReset}
            handleClose={() => dispatch({ type: 'close' })}
          />
        </Box>
      </Box>
    </>
  )
}
