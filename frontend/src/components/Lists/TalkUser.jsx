import React from "react"
import { useHistory } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import Typography from "@mui/material/Typography";
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const useStyles = makeStyles(() =>
  createStyles({
    'list': {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 2,
      my: 3,
      width: '100%'
    }
  }),
);

export const TalkUser = ({
  entries,
  setOpen,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <List>
      {entries.length === 0 &&
        <ListItemText>
          トークしている人はいません。
        </ListItemText>
      }
      {entries.length !== 0 &&
        entries.map(entry =>
          <ListItem
            key={entry.room_id.toString()}
            className={classes.list}
            sx={{ justifyContent: 'space-between' }}
          >
            <ListItemAvatar>
              <Avatar
                alt={entry.other_user.name}
                src={entry.other_user.avatar_url}
                sx={{ width: 60, height: 60 }}
                onClick={() => history.push(`/users/${entry.other_user.id}`)}
              />
            </ListItemAvatar>
            <Box
              onClick={() => history.push(`/talk_rooms/${entry.room_id}`)}
              sx={{ p: 3, width: '100%' }}
            >
              <ListItemText>
                <Typography variant="h5" sx={{ letterSpacing: 2 }}>
                  {entry.other_user.name} さん
                </Typography>
                {entry.message_content &&
                  <Typography variant="h6" >
                    <Box sx={{ letterSpacing: 2, mt: 2 }}>{entry.message_content}</Box>
                  </Typography>
                }
              </ListItemText>
            </Box>
            <ListItemButton onClick={() => setOpen({ isOpen: true, roomId: entry.room_id })}>
              <DeleteOutlinedIcon />
            </ListItemButton>
          </ListItem>
        )
      }
    </List>
  );
}
