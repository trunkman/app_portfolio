import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
// Style
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Api
import { fetchRooms } from "../../apis/users";
import { deleteRoom } from "../../apis/rooms";
// Reducer
import { roomInitialState, roomReducer } from '../../reducer/RoomReducer';
// Component
import { Loading } from '../../components/Loading';
import { DeleteDialog } from "../../components/Dialogs/DeleteDialog";

export const Rooms = ({ userId }) => {
  const history = useHistory();
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
      .then(() => {
        history.push(`/talk_rooms/${userId}`)
      });
  }

  useEffect(() => {
    Rooms();
  }, [open.isOpen])

  return (
    <>
      <Box sx={{
        maxWidth: 800
      }}>
        <h2>トークルーム</h2>
        {roomState.fetchState != 'ok' ? <Loading /> :
          <List sx={{ bgcolor: 'background.paper' }}>
            {roomState.entries.length == 0 &&
              <ListItemText>
                トークしている人はいません。
              </ListItemText>
            }
            {roomState.entries.length != 0 &&
              roomState.entries.map(entry =>
                <Box
                  display='flex'
                  key={entry.id.toString()
                  } >
                  <ListItem
                    button
                    divider
                    onClick={() => history.push(`/talk_rooms/${entry.room_id}`)}
                  >
                    <ListItemAvatar>
                      <AccountCircle sx={{ fontSize: 60 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={other_user.name}
                      secondary={other_user.profile}
                    />
                  </ListItem >
                  <Button onClick={() => setOpen({ isOpen: true, roomId: entry.room_id })}>
                    削除
                  </Button>
                </Box>
              )
            }
          </List>
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
