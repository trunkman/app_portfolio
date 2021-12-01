import React from "react";
import { useHistory } from 'react-router-dom';
// styles
import Button from "@mui/material/Button";
import { makeStyles } from '@material-ui/styles';
// api
import { postRoom } from "../../apis/rooms";

const useStyles = makeStyles(() => ({
  button: {
    background: '#42a5f5',
    border: 0,
    borderRadius: 50,
    color: 'white',
    height: 30,
    padding: '15px 20px',
    marginLeft: 10,
  },
}));

export const RoomButton = ({ userId }) => {
  const history = useHistory()
  const classes = useStyles();
  // メッセージルームを作成する
  const handleSubmit = () => {
    postRoom({ userId: userId })
      .then(data =>
        history.push(`/talk_rooms/${data.room.id}`)
      )
  }

  return (
    <Button
      className={classes.button}
      onClick={handleSubmit}
      variant="contained"
    >
      メッセージを送る
    </Button>
  )
}
