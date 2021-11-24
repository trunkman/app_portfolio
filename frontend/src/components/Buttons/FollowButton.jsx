import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
// styles
import Button from "@mui/material/Button";
//api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";

export const FollowButton = ({
  userId,
  followStatus,
}) => {

  const [follow, setFollow] = useState(false)

  const submitFollow = () => {
    postFollow({ userId: userId })
      .then(() => {
        setFollow(true)
        alert('フォローしました')
      })
  }

  const submitUnfollow = () => {
    deleteUnfollow(userId)
      .then(() => {
        setFollow(false)
        alert('フォローを解除しました')
      })
  }

  // もっと綺麗にできると思う
  useEffect(() => {
    setFollow(followStatus)
  })

  return (
    <>
      {follow === true
        ? (
          <Button
            onClick={submitUnfollow}
            variant="contained"
          >
            フォロー中
          </Button>
        ) : (
          <Button
            onClick={submitFollow}
            variant="outlined"
          >
            フォローする
          </Button>
        )
      }
    </>
  )
}
