import React from "react";
import { useHistory } from "react-router-dom";
// styled
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
// Component
import { MessageRoomButton } from "../Buttons/MessageRoomButton";
import { FollowButton } from "../Buttons/FollowButton";

const ListItemWrapper = styled(ListItem)(() => ({
  alignItems: 'center',
  display: 'flex',
  borderRadius: 2,
}));

const ListTitle = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: 'light',
  letterSpacing: theme.typography.body1.letterSpacing,
  lineHeight: 2,
}));

export const FollowList = ({ followStatus, user }) => {
  const history = useHistory()

  return (
    <>
      <ListItemWrapper key={user.id.toString()}>
        <ListItemAvatar>
          <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{ cursor: 'pointer', height: 70, width: 70 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box sx={{ py: 2, pl: 3, flexGrow: 1 }} >
          <ListItemText>
            <Typography variant="h5" sx={{ letterSpacing: 2 }}>
              <ListTitle>{user.name}</ListTitle>
            </Typography>
            <Typography variant="subtitle1" >
              <ListBody>{user.profile}</ListBody>
            </Typography>
          </ListItemText>
          <Box>
            <FollowButton
              userId={user.id}
              followStatus={followStatus}
            />
            <MessageRoomButton
              userId={user.id}
            />
          </Box>
        </Box>
      </ListItemWrapper>
    </>
  )
}
