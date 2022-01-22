import React from 'react';
import { useHistory } from 'react-router-dom';
// Style
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CardWrapper = styled('box')(() => ({
  alignContent: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: 300,
  width: 200,
}));

export const RankUserItem = ({
  user,
  rank,
  average,
  count,
}) => {
  const history = useHistory();

  return (
    <CardWrapper onClick={() => history.push(`/users/${user.id}`)}>
      <Typography gutterBottom variant="h5">
        <b>{rank}</b> 位
      </Typography>
      <Avatar
        src={user.avatar_url}
        sx={{ width: 150, height: 150, mb: 1, mx: 'auto' }}
      />
      <Typography variant="subtitle1" color="text.secondary">
        {user.name}
      </Typography>
      {average &&
        <Typography gutterBottom variant="h6">
          平均睡眠時間：<b>{average}</b>時間
        </Typography>
      }

      {count &&
        <Typography gutterBottom variant="h6">
          読了数：<b>{count}</b>冊
        </Typography>
      }
    </CardWrapper>
  );
}
