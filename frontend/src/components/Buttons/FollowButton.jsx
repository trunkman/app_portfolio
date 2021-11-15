import React, { useState, useEffect } from "react";
import axios from "axios";
// styles
import Button from "@mui/material/Button";
//api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";
import { fetchFollow } from "../../apis/relationships";


export const FollowButton = ({ userId, followingIds }) => {
  const [followStatus, setFollowStatus] = useState(false)
  // フォローする
  const submitFollow = () => {
    postFollow({ userId: userId })
      .then(() => {
        setFollowStatus(true)
        alert('フォローしました')
      })
  }
  // フォローを解除する
  const submitUnfollow = () => {
    deleteUnfollow({ userId: userId })
      .then(() => {
        setFollowStatus(false)
        alert('フォローを解除しました')
      })
  }

  useEffect(() => {
    // フォロー有無の確認
    setFollowStatus(followingIds.includes(userId))
  })

  return (
    <>
      {followStatus === true ? (<Button
        onClick={submitUnfollow}
        variant="contained"
      >
        フォロー中
      </Button>
      ) : (
        <Button
          onClick={submitFollow}
          variant="contained"
        >
          フォローする
        </Button>
      )
      }
    </>
  )
}
