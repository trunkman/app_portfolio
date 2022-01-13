import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
//Api
import { styled } from '@mui/system'
import { fetchAccountActivation } from '../../apis/accountActivations';
//Style
import Typography from '@mui/material/Typography';

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 2,
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
      .then(() => history.push('/'));
  }

  useEffect(() => activation(), [])

  return (
    <Typography sx={{ width: '100%' }}>
      <Title>
        アカウントを有効化しました
      </Title>
      <Link to={`/`}>
        アカウントページはこちら
      </Link>
    </Typography>
  );
}
