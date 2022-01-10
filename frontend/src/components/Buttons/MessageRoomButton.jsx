import React from "react";
import { useHistory } from 'react-router-dom';
// styles
import Button from "@mui/material/Button";
import { styled } from '@mui/system'
// api
import { postRoom } from "../../apis/rooms";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  marginLeft: 20,
  marginTop: 10,
}));

export const MessageRoomButton = ({ userId }) => {
  const history = useHistory()

  // メッセージルームを作成する
  const handleSubmit = () => {
    postRoom({ userId: userId })
      .then(data =>
        history.push(`/talk_rooms/${data.room.id}`)
      )
  }

  return (
    <ContainedButton onClick={handleSubmit} >
      <b>メッセージを送る</b>
    </ContainedButton>
  )
}
