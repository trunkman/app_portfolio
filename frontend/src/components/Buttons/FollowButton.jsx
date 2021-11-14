import React, { useState, useEffect } from "react";
import axios from "axios";
// styles
import Button from "@mui/material/Button";
//api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";
import { fetchFollow } from "../../apis/relationships";

// 改善中
export const FollowButton = (props) => {
  const [followStatus, setFollowStatus] = useState(true)

  // フォローする
  const submitFollow = () => {
    postFollow({ userId: props.userId })
      .then(setFollowStatus(true))
  }
  // フォローを解除する
  const submitUnfollow = () => {
    deleteUnfollow({ relationshipId: props.users.id })
      .then(setFollowStatus(false))
  }

  useEffect(() => {
    // フォロー有無を確認する
    fetchFollow({ userId: props.userId })
      .then(data => setFollowStatus(data))
  }, [])

  return (
    <>
      {(followStatus === true)
        ? <Button
          onClick={submitUnfollow}
          variant="contained"
        >
          フォロー中
        </Button>
        : <Button
          onClick={submitFollow}
          variant="contained"
        >
          フォローする
        </Button>
      }
    </>
  )
}
