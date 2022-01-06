import React from "react";
import { useHistory } from 'react-router-dom';
// styles
import Button from "@mui/material/Button";
import { styled } from '@mui/system'
// api
import { postRoom } from "../../apis/rooms";

// const useStyles = makeStyles(() =>
//   createStyles({
//     'button': {
//       background: '#42a5f5',
//       border: 0,
//       borderRadius: 50,
//       color: 'white',
//       height: 30,
//       padding: '15px 20px',
//       marginLeft: 20,
//     }
//   }),
// );

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  marginLeft: 20,
  marginTop: 15,
}));

export const RoomButton = ({ userId }) => {
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
