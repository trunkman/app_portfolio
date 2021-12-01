import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
// Style
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import Typography from "@mui/material/Typography";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { fetchRooms } from "../../apis/users";
import { deleteRoom } from "../../apis/rooms";
// Reducer
import { roomInitialState, roomReducer } from '../../reducer/RoomReducer';
// Component
import { Loading } from '../../components/Loading';
import { DeleteDialog } from "../../components/Dialogs/DeleteDialog";

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
    }
  }),
);

export const Rooms = ({ userId }) => {
  const classes = useStyles();
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
          <List>
            {roomState.entries.length === 0 &&
              <ListItemText>
                トークしている人はいません。
              </ListItemText>
            }
            {roomState.entries.length !== 0 &&
              roomState.entries.map(entry =>
                <ListItem
                  key={entry.room_id.toString()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    my: 3,
                  }}>
                  <ListItemAvatar>
                    <AccountCircle sx={{ fontSize: 60 }} />
                  </ListItemAvatar>
                  <Box
                    onClick={() => history.push(`/talk_rooms/${entry.room_id}`)}
                    sx={{
                      p: 3,
                      flexGrow: 1,
                    }}
                  >
                    <ListItemText>
                      <Typography variant="h5" sx={{ letterSpacing: 2 }}>
                        {entry.other_user.name} さん
                      </Typography>
                      <Typography variant="h6" >
                        <Box sx={{ letterSpacing: 2, mt: 2 }}>{entry.other_user.profile}</Box>
                      </Typography>
                    </ListItemText>
                  </Box>
                  <ListItemButton onClick={() => setOpen({ isOpen: true, roomId: entry.room_id })}>
                    <DeleteOutlinedIcon />
                  </ListItemButton>
                </ListItem>
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
