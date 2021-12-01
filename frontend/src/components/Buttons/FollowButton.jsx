import React, { useState } from "react";
// Styles
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";

const useStyles = makeStyles(() =>
  createStyles({
    'follow': {
      borderRadius: 50,
      color: '#1565c0',
      height: 30,
      padding: '15px 20px',
    },
    'unfollow': {
      background: '#1565c0',
      border: 0,
      borderRadius: 50,
      color: 'white',
      height: 30,
      padding: '15px 20px',
    }
  }),
);

export const FollowButton = ({
  userId,
  followStatus,
}) => {

  const classes = useStyles();
  const [follow, setFollow] = useState(followStatus)
  // フォローする
  const submitFollow = () => {
    postFollow({ userId: userId })
      .then(() => {
        setFollow(true)
        alert('フォローしました')
      })
  }
  // フォローを解除する
  const submitUnfollow = () => {
    deleteUnfollow(userId)
      .then(() => {
        setFollow(false)
        alert('フォローを解除しました')
      })
  }

  return (
    <>
      {follow === true
        ? (
          <Button
            className={classes.unfollow}
            onClick={submitUnfollow}
            variant="contained"
          >
            <b>フォロー中</b>
          </Button>
        ) : (
          <Button
            className={classes.follow}
            onClick={submitFollow}
            variant="outlined"

          >
            <b>フォローする</b>
          </Button>
        )
      }
    </>
  )
}
