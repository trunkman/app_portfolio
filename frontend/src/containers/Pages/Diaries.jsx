import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext } from '../../App';
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
// Api
import { fetchUserDiaries } from "../../apis/users";
import { fetchSleepDebt } from "../../apis/diaries";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer';
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer';
import { sleepDebtReducer, sleepDebtInitialState } from "../../reducer/SleepDebtReducer";
// Component
import { Calendar } from "../../components/UserInfomation/Calendar";
import { SleepInfo } from "../../components/UserInfomation/SleepInfo";
// Dialog
import { RecordDialog } from "../../components/Dialogs/RecordDialog";
import { SleepData } from "../../components/UserInfomation/SleepData";
import { Loading } from '../../components/Loading';

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignItems: 'center',
      flexDirection: 'end',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: 1000,
      mx: 'auto',
      textAlign: 'center',
      width: '100%',
    },
    'button': {
      backgroundColor: '#42a5f5',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 30,
      padding: '20px 30px',
    }
  }),
);

export const Diaries = ({ userId }) => {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const handleClose = () => dialogDispatch({ type: 'close' });
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);
  const [sleepDebtState, sleepDebtDispatch] = useReducer(sleepDebtReducer, sleepDebtInitialState);
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
        { // 睡眠負債が返された場合
          data.sleep_debt &&
            sleepDebtDispatch({
              type: 'fetchSuccess',
              payload: { sleepDebt: data.sleep_debt }
            })
        }
        { // 余剰睡眠が返された場合
          data.sleep_saving &&
            sleepDebtDispatch({
              type: 'fetchSuccess',
              payload: { sleepSaving: data.sleep_saving }
            })
        }
      })
  }

  useEffect(() => {
    fetchDiaries();
    SleepDebt();
  }, [dialogState.record, dialogState.diary])


  return (
    <Box className={classes.root}>
      <Typography variant="h3">
        <Box sx={{ letterSpacing: 10, pb: 5 }}><b> ~ {recordState.user.name}の睡眠日記 ~ </b></Box>
      </Typography>

      {recordState.fetchState !== 'ok' ? <Loading /> :
        <>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{
              alignItems: "center",
              justifyContent: 'center',
            }}>
              <SleepInfo
                userName={recordState.user.name}
                sleepDebt={sleepDebtState.sleepDebt}
                sleepSaving={sleepDebtState.sleepSaving}
              />
              <Box sx={{ pt: 2 }}>
                {authState.loggedIn &&
                  <Button

                    className={classes.button}
                    onClick={() => dialogDispatch({ type: 'record' })}
                  >
                    睡眠日記を書く
                  </Button>
                }
                <Typography variant="h6">
                  <Box sx={{ letterSpacing: 4, mt: 3 }}>理想睡眠時間：<b>{recordState.user.ideal_sleeping_hours}時間</b></Box>
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={12} md={6} sx={{ pt: 2 }}>
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

          <Box sx={{ py: 6, pl: 2 }}>
            <SleepData
              diaries={recordState.diaries}
            />
          </Box>
        </>
      }

      <RecordDialog
        handleClose={handleClose}
        open={dialogState.record}
      />
    </Box>
  )
}
