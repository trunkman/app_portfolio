import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
// Style
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Api
import { fetchRooms } from "../../apis/users";
// Reducer
import { roomInitialState, roomReducer } from '../../reducer/RoomReducer';

export const Friends = ({ loginUser }) => {
  const history = useHistory();
  const [roomState, roomDispatch] = useReducer(roomReducer, roomInitialState);
  // トークルームの一覧を取得する
  const Rooms = () => {
    fetchRooms(loginUser.id)
      .then(data => {
        roomDispatch({
          type: 'fetchSuccess',
          payload: data.entries,
        });
      });
  }

  useEffect(() => {
    Rooms();
  }, [])

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
                <div>
                  <ListItem
                    button
                    divider
                    key={entry.id}
                    onClick={() => history.push(`/talk_rooms/${entry.room_id}`)}
                  >
                    <ListItemAvatar>
                      <AccountCircle sx={{ fontSize: 60 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={entry.room_id}
                      secondary='メッセージルームの最後の投稿を記載する予定'
                    />
                  </ListItem >
                </div>
              )
            }
          </List>
        }
      </Box>
    </>
  )
}
