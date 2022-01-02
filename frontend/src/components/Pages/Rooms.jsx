import React, { useEffect, useReducer, useState } from "react";
// Style
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
// Api
import { fetchRooms } from "../../apis/users";
import { deleteRoom } from "../../apis/rooms";
// Reducer
import { roomInitialState, roomReducer } from '../../reducer/RoomReducer';
// Component
import { Loading } from '../Items/Loading';
import { DeleteDialog } from "../../components/Dialogs/DeleteDialog";
import { TalkUser } from "../../components/Lists/TalkUser";

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: 600,
      mx: 'auto',
      textAlign: 'center',
      width: '100%',
    },
    'list': {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 2,
      my: 3,
    }
  }),
);

export const Rooms = ({ userId }) => {
  const classes = useStyles();
  const [roomState, roomDispatch] = useReducer(roomReducer, roomInitialState);
  // 削除確認ダイアログの開閉
  const [open, setOpen] = useState({
    isOpen: false,
    roomId: '',
  });
  // トークルームの一覧を取得する
  const Rooms = () => {
    fetchRooms(userId)
      .then(data => {
        roomDispatch({
          type: 'fetchSuccess',
          payload: data.entries,
        });
      });
  }
  // トークルームを削除する
  const handleDelete = () => {
    deleteRoom(open.roomId)
      .then(() => setOpen({ isOpen: false }));
  }

  useEffect(() => {
    Rooms();
  }, [open.isOpen])

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3">
          <Box sx={{ letterSpacing: 10, pb: 2 }}><b>トークルーム</b></Box>
        </Typography>

        {roomState.fetchState !== 'ok' ? <Loading /> :
          <TalkUser
            entries={roomState.entries}
            setOpen={setOpen}
          />
        }
      </Box>

      <DeleteDialog
        handleClose={() => setOpen({ isOpen: false })}
        handleDelete={handleDelete}
        message={'トークルームを削除'}
        open={open.isOpen}
      />
    </>
  )
}
