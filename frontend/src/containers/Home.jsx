import React, { Fragment, useState } from "react";
//styled
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
// コンポーネント
import { SignUpDialog } from "../components/SignUpDialog";
import { LogInDialog } from "../components/LogInDialog";

export const Home = (props) => {
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  // 新規登録Dialogを開閉する関数
  const handleOpenSignUp = () => setOpenSignUpDialog(true)
  const handleCloseSignUp = () => setOpenSignUpDialog(false)
  // ログインDialogを開閉する関数
  const handleOpenLogIn = () => setOpenLogInDialog(true)
  const handleCloseLogIn = () => setOpenLogInDialog(false)

  // 返り値：HOME画面
  return (
    <Fragment>
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
          <Button variant="contained" sx={{ mr: 3 }} onClick={handleOpenSignUp} >
            新規登録
          </Button>
          <SignUpDialog
            open={openSignUpDialog}
            handleClose={handleCloseSignUp}
            handleLogIn={props.handleLogIn}
          />
          <Button variant="contained" sx={{ mr: 3 }} onClick={handleOpenLogIn}>
            ログイン
          </Button>
          <LogInDialog
            open={openLogInDialog}
            handleClose={handleCloseLogIn}
            handleLogIn={props.handleLogIn}
          />
        </Box>
      </Box>
    </Fragment>
  )
}
