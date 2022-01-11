import React, { useState } from "react";
// Styles
import { styled } from '@mui/system'
// Api
import { postFollow } from "../../apis/relationships";
import { deleteUnfollow } from "../../apis/relationships";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  marginTop: 10,
  padding: '0px 20px',
}));

const OutinedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  marginTop: 10,
  padding: '0px 20px',
}));

export const FollowButton = ({ followStatus, userId }) => {
  const [follow, setFollow] = useState(null)

  // フォローする
  const submitFollow = () => {
    postFollow({ userId: userId })
      .then(() => {
        setFollow(true)
      })
  }

  // フォローを解除する
  const submitUnfollow = () => {
    deleteUnfollow(userId)
      .then(() => {
        setFollow(false)
      })
  }

  return (
    <>
      {follow || followStatus === true
        ?
        <OutinedButton onClick={submitUnfollow}>
          <b>フォロー中</b>
        </OutinedButton>
        :
        <ContainedButton onClick={submitFollow}>
          <b>フォローする</b>
        </ContainedButton>
      }
    </>
  )
}
