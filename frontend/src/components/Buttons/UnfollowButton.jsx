import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

export const UnfollowButton = (props) => {
  const handleClick = () => {
    return axios(deleteUnfollow({ userId: props.users.id })
      .then(data => {
        props.handleUnfollow(data.follow_status)
      }))
  }

  return (
    <Button
      fullWidth="true"
      onClick={handleClick}
      p={2}
      variant="contained"
    >
      フォローを解除する
    </Button>
  )
}
