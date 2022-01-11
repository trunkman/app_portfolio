import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
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
import { RecordDialog } from "../../components/Dialogs/RecordDialog";
import { SleepData } from "../UserInfomations/SleepData";
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
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  width: 200,
  padding: '0px 20px',
  marginTop: '30px',
}));

const SubBody = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
}));

export const Diaries = ({ userId }) => {
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);
  const [sleepDebtState, sleepDebtDispatch] = useReducer(sleepDebtReducer, sleepDebtInitialState);

  // ダイアログを閉じる
  const handleClose = () => dialogDispatch({ type: 'close' });

  // 日記情報を取得する
  const fetchDiaries = () => {
    recordDispatch({ type: 'fetching' });
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
  }, [dialogState.record, dialogState.diary, userId])


  return (
    <Container>
      {recordState.fetchState !== 'ok' ? <Loading /> :
        <>
          <Typography variant="h3">
            <Title>≪ {recordState.user.name}の睡眠日記 ≫</Title>
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={5} sx={{
              alignItems: "center",
              justifyContent: 'center',
              pt: 8
            }}>
              <SleepInfo
                userName={recordState.user.name}
                sleepDebt={sleepDebtState.sleepDebt}
                sleepSaving={sleepDebtState.sleepSaving}
              />
              <Box>
                <Typography variant="h6">
                  <SubBody>（理想睡眠時間：{recordState.user.ideal_sleeping_hours}時間）</SubBody>
                </Typography>
                {authState.loggedIn &&
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <ContainedButton>
                      ツイッターに投稿する
                    </ContainedButton>
                    <ContainedButton onClick={() => dialogDispatch({ type: 'record' })}>
                      睡眠日記を書く
                    </ContainedButton>
                  </Box>
                }
              </Box>
            </Grid>
            <Grid item sm={12} md={7} sx={{ pt: 2, px: 2 }}>
              <Calendar
                userId={userId}
                open={dialogState.diary}
                handleClose={handleClose}
                handleOpen={() => dialogDispatch({ type: 'diary' })}
                recordState={recordState}
                recordDispatch={recordDispatch}
              />
            </Grid>
          </Grid>
          <Grid item sm={12} sx={{ py: 6, pl: 2 }}>
            <SleepData
              diaries={recordState.diaries}
            />
          </Grid>
        </>
      }
      <RecordDialog
        handleClose={handleClose}
        open={dialogState.record}
      />
    </Container>
  )
}
