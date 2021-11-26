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
          payload: { timeline: data.timeline }
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
            timelineState.fetchState != 'ok' ? <Loading /> :
              timelineState.timeline.map(timeline =>
                <Micropost
                  commentCount={timeline.commentCount}
                  likeStatus={timeline.likeStatus}
                  loginUserId={loginUser.id}
                  micropost={timeline.micropost}
                />
              )
          }
        </Box>
      </Box>
    </>
  )
}
