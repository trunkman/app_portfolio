import React, { useEffect, useReducer } from 'react';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
// Api
import { fetchTimeline } from '../../apis/users';
// Reducer
import { timelineInitialState, timelineReducer } from '../../reducer/TimelineReducer';
// Cpmponent
import { Micropost } from '../Items/Micropost';
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 700,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 3,
}));

export const Timeline = ({ userId }) => {
  const [timelineState, timelineDispatch] = useReducer(timelineReducer, timelineInitialState);

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
    Timeline();
  }, [timelineState.reRender, userId])

  return (
    <>
      <Container>
        <Typography>
          <Title>≪ タイムライン ≫</Title>
        </Typography>
        <Box>
          {timelineState.fetchState !== 'ok' && <Loading />}

          {timelineState.fetchState === 'ok' && timelineState.timeline.length === 0 &&
            <Box sx={{ pt: 4 }}>
              <h3>投稿はありません。</h3>
            </Box>
          }

          {timelineState.fetchState === 'ok' && timelineState.timeline.length !== 0 &&
            timelineState.timeline.map(timeline =>
              <Micropost
                commentCount={timeline.commentCount}
                likeStatus={timeline.likeStatus}
                micropost={timeline.micropost}
                dataFetcing={() => timelineDispatch({ type: 'fetching' })}
                user={timeline.user}
              />
            )
          }
        </Box>
      </Container>
    </>
  )
}
