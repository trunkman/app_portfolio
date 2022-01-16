import React from "react";
// Style
import ListItemText from "@mui/material/ListItemText";
// Components
import { Comment } from "../Items/Comment";

export const ProfileCommentList = ({
  dataFetcing,
  profileState,
}) => {

  return (
    <>
      {profileState.comments.length === 0 &&
        <ListItemText sx={{ pt: 4, textAlign: 'center' }}>
          <h3>誰かの投稿にコメントしてみましょう。</h3>
        </ListItemText>
      }

      {profileState.comments.length !== 0 &&
        profileState.comments.map(comment =>
          <Comment
            comment={comment}
            dataFetcing={dataFetcing}
            user={profileState.user}
          />
        )
      }
    </>
  )
}
