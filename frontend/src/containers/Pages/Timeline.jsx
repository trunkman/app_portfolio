import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
// Api
import { fetchTimeline } from "../../apis/users";
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
import { timelineInitialState, timelineReducer } from '../../reducer/TimelineReducer';
// Cpmponent
import { Micropost } from "../../components/Lists/Micropost";

export const Timeline = ({
  userId,
  loginUser,
}) => {
  const [timelineState, timelineDispatch] = useReducer(timelineReducer, timelineInitialState)

  // 投稿一覧を取得する
  const Timeline = () => {
    fetchTimeline(userId)
      .then(data => {
        timelineDispatch({
          type: 'fetchSuccess',
          payload: {
            timeline: data.timeline,
            liked_micropost_ids: data.liked_micropost_ids,
            comments: data.comments,
          }
        })
      })
  }

  useEffect(() => {
    Timeline()
  }, [timelineState.reRender])

  return (
    <>
      <Box sx={{
        p: 2,
        mx: 'auto',
        maxWidth: 800
      }}>
        <h2>投稿一覧</h2>
        <Box>
          {
            timelineState.timeline.map(micropost =>
              <Micropost
                micropost={micropost}
                loginUserId={loginUser.id}
                likedStatus={true}
              // commentStatus={}
              />
            )
          }
        </Box>
      </Box>
    </>
  )
}

{/* {
    comments.map(comment =>
      <ListItem key={comment.id}>
        <ListItemAvatar>
          <AccountCircle sx={{ fontSize: 40 }} />
        </ListItemAvatar>
        <ListItemText
          component="div"
          primary={comment.id}
          secondary={comment.created_at}
        />
        {loginUser.id === comment.user_id && (
          <Link component="div" onClick={() => deleteCommentSubmit(comment.id)}>
            delete
          </Link>
        )}
        <Typography variant="body1" pl={2}>
          {comment.content}
        </Typography>
        <LikeButton
          loginUserId={loginUser.id}
          micropostId={comment.id}
        />
        <CommentButton
          loginUserId={loginUser.id}
          micropostId={comment.id}
        />
      </ListItem >
    )
  } */}
