import React, { useEffect, useReducer, useState } from "react";
// Style
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
// Api
import { fetchRooms } from "../../apis/users";
import { deleteRoom } from "../../apis/rooms";
// Reducer
import { roomInitialState, roomReducer } from '../../reducer/RoomReducer';
// Component
import { Loading } from '../Items/Loading';
import { DeleteDialog } from "../Dialogs/DeleteDialog";
import { TalkUserList } from "../Lists/TalkUserList";

const Container = styled('box')(() => ({
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 600,
  padding: '0px 10px',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

export const MessageRooms = ({ userId }) => {
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
  }

  useEffect(() => {
    Rooms();
  }, [open.isOpen, userId])

  return (
    <>
      <Container>
        <Typography>
          <Title>≪ トークルーム ≫</Title>
        </Typography>
        {roomState.fetchState !== 'ok' && <Loading />}

        {roomState.fetchState === 'ok' &&
          <TalkUserList
            entries={roomState.entries}
            setOpen={setOpen}
          />
        }
      </Container>

      <DeleteDialog
        handleClose={() => setOpen({ isOpen: false })}
        handleDelete={handleDelete}
        message={'トークルームを削除'}
        open={open.isOpen}
      />
    </>
  )
}
