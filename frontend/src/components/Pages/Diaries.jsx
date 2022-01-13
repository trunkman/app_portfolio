import React, { useEffect, useReducer } from "react";
// Style
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
// Api
import { fetchUserDiaries } from "../../apis/users";
import { fetchSleepDebt } from "../../apis/diaries";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer';
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer';
import { sleepDebtReducer, sleepDebtInitialState } from "../../reducer/SleepDebtReducer";
// Component
import { Calendar } from "../UserInfomations/Calendar";
import { SleepInfo } from "../UserInfomations/SleepInfo";
// Dialog
import { SleepGraph } from "../UserInfomations/SleepGraph";
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  alignItems: 'center',
  flexDirection: 'end',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 1000,
  mx: 'auto',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));

const TitleTag = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 3,
}));

export const Diaries = ({ userId }) => {
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);
  const [sleepDebtState, sleepDebtDispatch] = useReducer(sleepDebtReducer, sleepDebtInitialState);

  // ダイアログを閉じる
  const handleClose = () => dialogDispatch({ type: 'close' });

  // 日記情報を取得する
  const fetchDiaries = () => {
    fetchUserDiaries(userId)
      .then(data => {
        recordDispatch({
          type: 'fetchSuccess',
          payload: {
            user: data.user,
            diaries: data.diaries,
          }
        });
      });
  }

  // 睡眠負債を取得する
  const SleepDebt = () => {
    sleepDebtDispatch({ type: 'fetching' });
    fetchSleepDebt(userId)
      .then(data => {
        // 睡眠負債が返された場合
        data.sleep_debt && (
          sleepDebtDispatch({
            type: 'fetchSuccess',
            payload: { sleepDebt: data.sleep_debt }
          })
        )
        // 余剰睡眠が返された場合
        data.sleep_saving && (
          sleepDebtDispatch({
            type: 'fetchSuccess',
            payload: { sleepSaving: data.sleep_saving }
          })
        )
      })
  }

  useEffect(() => {
    fetchDiaries();
    SleepDebt();
  }, [recordState.fetchState, userId])

  return (
    <Container>
      {recordState.fetchState !== 'ok' && <Loading />}
      <Typography>
        <Title>≪ 睡眠日記 ≫<br /></Title>
        <TitleTag>~ {recordState.user.name} ~</TitleTag>
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={5} sx={{
          alignItems: "center",
          justifyContent: 'center',
          pt: 8
        }}>
          <SleepInfo
            handleClose={handleClose}
            handoleOpen={() => dialogDispatch({ type: 'record' })}
            open={dialogState.record}
            recordDispatch={recordDispatch}
            recordState={recordState}
            sleepDebt={sleepDebtState.sleepDebt}
            sleepSaving={sleepDebtState.sleepSaving}
            userId={userId}
          />
        </Grid>
        <Grid item sm={12} md={7} sx={{ pt: 2, px: 2 }}>
          <Calendar
            open={dialogState.diary}
            handleClose={handleClose}
            handleOpen={() => dialogDispatch({ type: 'diary' })}
            recordState={recordState}
            recordDispatch={recordDispatch}
            userId={userId}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} sx={{ py: 6, pl: 2 }}>
        <SleepGraph
          diaries={recordState.diaries}
        />
      </Grid>
    </Container >
  )
}
