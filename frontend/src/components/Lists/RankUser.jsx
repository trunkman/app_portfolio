import React from "react";
import { Link } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CardWrapper = styled(CardActionArea)(() => ({
  alignContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: 280,
}));

export const RankUser = ({
  user,
  rank,
  average,
  count,
}) => {

  return (
    <>
      <Card sx={{ p: 2 }}>
        <CardWrapper
          component={Link}
          to={`/users/${user.id}`}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              <b>{rank}</b> 位
            </Typography>
            <Avatar
              src={user.avatar_url}
              sx={{ width: 100, height: 100, mb: 1 }}
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
          </CardContent>
        </CardWrapper>
      </Card>
    </>
  );
}
