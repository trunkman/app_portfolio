import React, { useState, useEffect } from "react";
import axios from "axios";
// styles
import Button from "@mui/material/Button";
//api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";
import { fetchFollow } from "../../apis/relationships";


export const FollowButton = ({ userId, followingIds }) => {
  const Initialfollowing = followingIds.includes(userId)
  const [following, setFollowing] = useState(Initialfollowing)
  // フォローする
  const submitFollow = () => {
    postFollow({ userId: userId })
      .then(() => {
        setFollowing(true)
        alert('フォローしました')
      })
  }
  // フォローを解除する
  const submitUnfollow = () => {
    deleteUnfollow({ userId: userId })
      .then(() => {
        setFollowing(false)
        alert('フォローを解除しました')
      })
  }

  useEffect(() => {
    // フォロー有無の確認
    setFollowing(Initialfollowing)
  })

  return (
    <>
      {following === true
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
