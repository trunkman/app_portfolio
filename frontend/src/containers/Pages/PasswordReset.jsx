import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// api
import { patchPasswordReset } from "../../apis/passwordResets";
// コンポーネント
import { Password } from '../../components/Forms/Password';
import { PasswordConfirmation } from '../../components/Forms/PasswordConfirmation';

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: 600,
      mx: 'auto',
      textAlign: 'center',
      width: '100%',
    },
    'button': {
      background: '#42a5f5',
      border: 0,
      borderRadius: 50,
      color: 'white',
      height: 30,
      padding: '15px 20px',
      margin: '30px 0px'
    }
  }),
);

export const PasswordReset = (props) => {
  const classes = useStyles();
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')
  // パスワードを再設定する
  const handleSubmit = () => {
    patchPasswordReset({
      id: props.match.params.id,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }).then(data => {
      data && alert("パスワードを再設定しました。新しいパスワードで再ログインしてください。")
      history.push(`/`)
    })
  }

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3">
          <Box sx={{ letterSpacing: 10, pb: 5 }}><b>パスワード再設定</b></Box>
        </Typography>
        <Typography>
          <b>新しいパスワードを入力してください。</b>
        </Typography>
        <Password
          password={password}
          handleChange={e => setPassword(e.target.value)}
        />
        <PasswordConfirmation
          passwordConfirmation={passwordConfirmation}
          handleChange={e => setpasswordConfirmaiton(e.target.value)}
        />
        <Button
          className={classes.button}
          onClick={handleSubmit}
          type='submit'
        >
          パスワードを再登録する
        </Button>
      </Box>
    </>
  )
}
