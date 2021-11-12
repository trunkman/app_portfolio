import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// styles
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// api
import { patchPasswordReset } from "../../apis/passwordReset";
// コンポーネント
import { Password } from '../../components/Forms/Password';
import { PasswordConfirmation } from '../../components/Forms/PasswordConfirmation';

export const PasswordReset = (props) => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')
  const history = useHistory()
  const handleSubmit = () => {
    patchPasswordReset({
      id: props.match.params.id,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }).then(data => {
      history.push(`/`)
    })
  }

  return (
    <>
      <h1>パスワード再設定</h1>
      <Grid container>
        <Grid item>
          <Typography>
            新しいパスワードを入力してください
          </Typography>
          <Password
            password={password}
            handleChange={e => setPassword(e.target.value)}
          />
          <PasswordConfirmation
            passwordConfirmation={passwordConfirmation}
            handleChange={e => setpasswordConfirmaiton(e.target.value)}
          />
          <Button onClick={handleSubmit} type='submit'>
            パスワードを再登録する
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
