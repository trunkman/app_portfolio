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
import { RoomButton } from "../Buttons/RoomButton";
import { FollowButton } from "../Buttons/FollowButton";

const ListItemWrapper = styled(ListItem)(() => ({
  alignItems: 'center',
  display: 'flex',
  borderRadius: 2,
}));

export const FollowList = ({
  followStatus,
  user,
}) => {
  const history = useHistory()

  return (
    <>
      <ListItemWrapper key={user.id.toString()}>
        <ListItemAvatar>
          <Avatar
            alt={user.name}
            cursor='pointer'
            src={user.avatar_url}
            sx={{ width: 70, height: 70 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box sx={{ py: 3, pl: 3, flexGrow: 1 }} >
          <ListItemText>
            <Typography variant="h5" sx={{ letterSpacing: 2 }}>
              <b>{user.name} さん</b>
            </Typography>
            <Typography variant="h6" >
              <Box sx={{ letterSpacing: 2, mt: 2 }}>{user.profile}</Box>
            </Typography>
          </ListItemText>
          <Box>
            <FollowButton
              userId={user.id}
              followStatus={followStatus}
            />
            <RoomButton
              userId={user.id}
            />
          </Box>
        </Box>
      </ListItemWrapper>
    </>
  )
}
