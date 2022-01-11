import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography";
// Api
import { patchUpdate } from '../../apis/users';
// Component
import { Name } from '../Forms/Name';
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { PasswordConfirmation } from '../Forms/PasswordConfirmation';
import { IdealSleepingHours } from '../Forms/IdealSleepingHours';
import { Profile } from '../Forms/Profile';

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      border: 0,
      borderRadius: 3,
      color: '#90caf9',
      height: 30,
      padding: '15px 20px',
    }
  }),
);

export const SettingDialog = ({ handleClose, open }) => {
  const classes = useStyles();
  const history = useHistory();
  const { authState, authDispatch } = useContext(AuthContext)

  // 送信のCallback関数
  const submitUpdate = () => {
    patchUpdate({
      user_id: authState.loginUser.id,
      name: authState.name,
      email: authState.email,
      password: authState.password,
      password_confirmation: authState.passwordConfirmation,
      idealSleepingHours: authState.idealSleepingHours,
      profile: authState.profile,
    }).then(data => {
      handleClose();
    })
  }

  useEffect(() => {
    authDispatch({
      type: 'preUpdate',
      payload: {
        name: authState.loginUser.name,
        email: authState.loginUser.email,
        password: authState.loginUser.password,
        passwordConfirmation: authState.loginUser.passwordConfirmation,
        idealSleepingHours: authState.loginUser.ideal_sleeping_hours,
        profile: authState.loginUser.profile,
      }
    });
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        <Typography variant="h5">
          <Box sx={{ letterSpacing: 3, pt: 2 }}><b>プロフィール編集</b></Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Name
          name={authState.name}
          handleChange={e =>
            authDispatch({
              type: 'name',
              payload: e.target.value,
            })
          }
        />
        <Email
          email={authState.email}
          handleChange={e =>
            authDispatch({
              type: 'email',
              payload: e.target.value,
            })
          }
        />
        <IdealSleepingHours
          idealSleepingHours={authState.idealSleepingHours}
          handleChange={e =>
            authDispatch({
              type: 'idealSleepingHours',
              payload: e.target.value,
            })
          }
        />
        <Profile
          profile={authState.profile}
          handleChange={e =>
            authDispatch({
              type: 'profile',
              payload: e.target.value,
            })
          }
        />
        <Password
          password={authState.password}
          handleChange={e =>
            authDispatch({
              type: 'password',
              payload: e.target.value,
            })
          }
        />
        <PasswordConfirmation
          passwordConfirmation={authState.passwordConfirmation}
          handleChange={e =>
            authDispatch({
              type: 'passwordConfirmation',
              payload: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => handleClose()}
        >
          閉じる
        </Button>
        <Button
          className={classes.button}
          onClick={submitUpdate}
          type='submit'
        >
          更新する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
