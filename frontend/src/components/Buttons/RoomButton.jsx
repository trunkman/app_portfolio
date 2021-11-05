import React from "react";
import { useHistory } from 'react-router-dom';
// styles
import Button from "@mui/material/Button";
// api
import { postRoom } from "../../apis/rooms";

export const RoomButton = (props) => {
  const history = useHistory()
  // メッセージルームを作成する
  const handleSubmit = () => {
    postRoom({ userId: props.userId })
      .then(data =>
        history.push(`/rooms/${data.room.id}`)
      )
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="contained"
    >
      メッセージを送る
    </Button>
  )
}
