import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//Api
import { styled } from '@mui/system'
import { fetchAccountActivation } from '../../apis/accountActivations';
//Style
import Typography from '@mui/material/Typography';

const Title = styled('box')(({ theme }) => ({
  display: 'flex',
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  lineHeight: 2,
  justifyContent: 'center',
  paddingTop: 50,
  textAlign: 'center',
}));

export const AccountActivation = ({ activationToken }) => {
  const history = useHistory();
  // URLのクエリパラメータを取得
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const queryEmail = query.get('email')

  // アカウントを有効化する
  const activation = () => {
    fetchAccountActivation(activationToken, queryEmail)
      .then(data => {
        data && alert('ホーム画面からログインしてください');
        history.push(`/`);
      })
      .catch(e => {
        alert('アカウント有効化できませんでした');
        history.push(`/`);
      });
  }

  useEffect(() => activation(), [])

  return (
    <Typography sx={{ width: '100%' }}>
      <Title>
        アカウントを有効化しました
      </Title>
    </Typography>
  );
}
