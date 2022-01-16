import React from "react";
// Style
import ListItemText from "@mui/material/ListItemText";
// Components
import { Micropost } from "../Items/Micropost";

export const ProfileMicropostList = ({
  dataFetcing,
  microposts,
  tabStatus,
  user,
}) => {

  return (
    <>
      {microposts.length === 0 && tabStatus === 'micropost' &&
        <ListItemText sx={{ pt: 4, textAlign: 'center' }}>
          <h3>投稿してみましょう。</h3>
        </ListItemText>
      }

      {microposts.length === 0 && tabStatus === 'like' &&
        <ListItemText sx={{ pt: 4, textAlign: 'center' }}>
          <h3>誰かの投稿をいいねしてみましょう。</h3>
        </ListItemText>
      }

      {microposts.length !== 0 &&
        microposts.map(micropost =>
          <Micropost
            commentCount={micropost.commentCount}
            dataFetcing={dataFetcing}
            likeStatus={micropost.likeStatus}
            micropost={
              tabStatus === 'micropost' ? micropost.micropost : micropost.liked_micropost
            }
            user={user}
          />
        )
      }
    </>
  )
}
