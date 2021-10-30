import React from "react";
import axios from "axios";
// styled
import { Button } from "@mui/material";
//api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";

export const FollowButton = (props) => {
  // フォローする
  const submitFollow = () => {
    return axios(postFollow({ userId: props.userId }))
      .then(props.handleFollow(true))
  }
  // フォローを解除する
  const submitUnfollow = () => {
    return axios(deleteUnfollow({ relationshipId: props.users.id }))
      .then(props.handleFollow(false))
  }

  return (
    <>
      {(props.followStatus)
        ? <Button
          fullWidth={true}
          onClick={submitUnfollow}
          variant="contained"
        >
          フォローを解除する
        </Button>
        : <Button
          fullWidth={true}
          onClick={submitFollow}
          variant="contained"
        >
          フォローする
        </Button>
      }
    </>
  )
}
