import React from "react";
import { Link } from "react-router-dom";
// Style
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles(() =>
  createStyles({
    'card': {
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: 280,
    },
  }),
);

export const RankUser = ({
  user,
  rank,
  average,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card sx={{ p: 2 }}>
        <CardActionArea
          className={classes.card}
          component={Link}
          to={`/users/${user.id}`}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              <b>{rank}</b> 位
            </Typography>
            <AccountCircle
              color='primary'
              sx={{ fontSize: 100 }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {user.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              平均睡眠時間：<b>{average}</b>時間
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
