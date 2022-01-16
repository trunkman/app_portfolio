import React from "react";
// Style
import { styled } from '@mui/system';
import ListItemText from "@mui/material/ListItemText";
// Components
import { FollowItem } from '../Items/FollowItem';

const MessageWrapper = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  flexGrow: 1,
  height: '100%',
  marginBottom: 150,
  maxWidth: 600,
  width: '100%',
}));

export const FollowList = ({
  tabStatus,
  users,
}) => {

  return (
    <MessageWrapper>
      {users.length === 0 && tabStatus === 'following' &&
        <ListItemText sx={{ pt: 4 }}>
          <h3>気になる人をフォローしてみましょう。</h3>
        </ListItemText>
      }

      {users.length === 0 && tabStatus === 'followers' &&
        <ListItemText sx={{ pt: 4 }}>
          <h3>フォロワーはまだいません。</h3>
        </ListItemText>
      }

      {users.length !== 0 &&
        users.map(followed =>
          <FollowItem
            user={followed.user}
            followStatus={followed.followStatus}
          />
        )
      }
    </MessageWrapper>
  )
}
