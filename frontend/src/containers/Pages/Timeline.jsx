import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
// Api
import { fetchTimeline } from "../../apis/users";
// Reducer
import { timelineInitialState, timelineReducer } from '../../reducer/TimelineReducer';
// Cpmponent
import { Micropost } from "../../components/Lists/Micropost";
import { Loading } from '../../components/Loading';

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
        <h2>タイムライン</h2>
        <Box>
          {
            timelineState.fetchState != 'ok' ? <Loading /> :
              timelineState.timeline.map(timeline =>
                <Micropost
                  commentCount={timeline.commentCount}
                  likeStatus={timeline.likeStatus}
                  loginUser={loginUser}
                  micropost={timeline.micropost}
                />
              )
          }
        </Box>
      </Box>
    </>
  )
}
