import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Api
import { patchPasswordReset } from "../../apis/passwordResets";
// コンポーネント
import { Password } from '../../components/Forms/Password';
import { PasswordConfirmation } from '../../components/Forms/PasswordConfirmation';

const Container = styled('box')(() => ({
  alignItems: 'center',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 600,
  mx: 'auto',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 2,
}));

const TitleTag = styled('box')(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  lineHeight: 2,
}));

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  margin: '15px 0px',
}));

export const PasswordReset = ({ passwordResetToken }) => {
  const history = useHistory();
  // URLのクエリパラメータを取得
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const queryEmail = query.get('email');
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')

  // パスワードを再設定する
  const handleSubmit = () => {
    patchPasswordReset({
      passwordResetToken: passwordResetToken,
      queryEmail: queryEmail,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }).then(data => {
      data && alert("パスワードを再設定しました。新しいパスワードで再ログインしてください。")
      history.push(`/`)
    })
  }

  return (
    <>
      <Container>
        <Typography>
          <Title>パスワード再設定</Title>
        </Typography>
        <Typography>
          <TitleTag>新しいパスワードを入力してください。</TitleTag>
        </Typography>
        <Password
          password={password}
          handleChange={e => setPassword(e.target.value)}
        />
        <PasswordConfirmation
          passwordConfirmation={passwordConfirmation}
          handleChange={e => setpasswordConfirmaiton(e.target.value)}
        />
        <ContainedButton
          onClick={handleSubmit}
          type='submit'
        >
          パスワードを再登録する
        </ContainedButton>
      </Container>
    </>
  )
}
