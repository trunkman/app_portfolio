import React, { useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
import Typography from "@mui/material/Typography";
// Api
import { fetchTimeline } from "../../apis/users";
// Reducer
import { timelineInitialState, timelineReducer } from '../../reducer/TimelineReducer';
// Cpmponent
import { Micropost } from "../../components/Lists/Micropost";
import { Loading } from '../../components/Loading';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 800,
    mx: 'auto',
    textAlign: 'center',
    width: '100%',
  },
}));

export const Timeline = ({
  userId,
  loginUser,
}) => {
  const classes = useStyles();
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
    Timeline()
  }, [timelineState.reRender])

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3">
          <Box sx={{ letterSpacing: 10, pb: 5 }}><b>タイムライン</b></Box>
        </Typography>
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
