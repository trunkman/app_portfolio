import React from "react"
import { useHistory } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import Typography from "@mui/material/Typography";
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ListWrapper = styled(ListItem)(() => ({
  alignItems: 'center',
  borderRadius: 2,
  display: 'flex',
  justifyContent: 'space-between',
  my: 3,
  width: '100%'
}));

const ListTitle = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  lineHeight: 2,
}));

export const TalkUserList = ({ entries, setOpen, }) => {
  const history = useHistory();

  return (
    <List>
      {entries.length === 0 &&
        <ListItemText sx={{ pt: 4 }}>
          <h3>トークしている人はいません。</h3>
        </ListItemText>
      }
      {entries.length !== 0 &&
        entries.map(entry =>
          <ListWrapper key={entry.room_id.toString()}>
            <ListItemAvatar>
              <Avatar
                alt={entry.other_user.name}
                src={entry.other_user.avatar_url}
                sx={{ cursor: 'pointer', height: 60, width: 60 }}
                onClick={() => history.push(`/users/${entry.other_user.id}`)}
              />
            </ListItemAvatar>
            <Box
              onClick={() => history.push(`/talk_rooms/${entry.room_id}`)}
              sx={{ cursor: 'pointer', p: 3, width: '100%' }}
            >
              <ListItemText>
                <Typography variant="h5">
                  <ListTitle>{entry.other_user.name}</ListTitle>
                </Typography>
                {entry.message &&
                  <Typography variant="subtitle1">
                    <ListBody>{entry.message.content}</ListBody>
                  </Typography>
                }
              </ListItemText>
            </Box>
            <ListItemButton onClick={() => setOpen({ isOpen: true, roomId: entry.room_id })}>
              <DeleteOutlinedIcon />
            </ListItemButton>
          </ListWrapper>
        )
      }
    </List>
  );
}
