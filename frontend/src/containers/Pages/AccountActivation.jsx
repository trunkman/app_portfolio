import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
//Api
import { fetchAccountActivation } from '../../apis/accountActivations';
//Style
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Typography variant="h4" sx={{ width: '100%' }}>
      <Box sx={{ letterSpacing: 6, pb: 2, mb: 4, borderBottom: 1 }}>
        <b>アカウントを有効化しました</b>
      </Box>
      <Link to={`/`}>
        アカウントページはこちら
      </Link>
    </Typography>
  );
}
