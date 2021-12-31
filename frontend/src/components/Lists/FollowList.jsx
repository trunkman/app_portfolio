import React from "react";
import { useHistory } from "react-router-dom";
// styled
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// Component
import { RoomButton } from "../Buttons/RoomButton";
import { FollowButton } from "../Buttons/FollowButton";

export const FollowList = ({
  followStatus,
  user,
}) => {
  const history = useHistory()

  return (
    <>
      <ListItem
        key={user.id.toString()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          my: 3,
        }}>

        <ListItemAvatar>
          <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{ width: 60, height: 60 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box
          onClick={() => history.push(`/users/${user.id}`)}
          sx={{
            py: 3,
            pl: 3,
            flexGrow: 1,
          }}
        >
          <ListItemText>
            <Typography variant="h5" sx={{ letterSpacing: 2 }}>
              {user.name} さん
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
      </ListItem>
    </>
  )
}
