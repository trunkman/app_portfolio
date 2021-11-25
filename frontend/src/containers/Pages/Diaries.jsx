import React, { useReducer } from "react";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer';
// Component
import { Calendar } from "../../components/UserInfomation/Calendar";
import { SleepInfo } from "../../components/UserInfomation/SleepInfo";
// Dialog
import { RecordDialog } from "../../components/Dialogs/RecordDialog";

export const Diaries = ({ match }) => {
  const userId = match.params.id
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  return (
    <>
      <h2>TestUserの睡眠日記</h2>
      <Grid container sx={{ py: 10 }}>
        <Grid item sm={12} md={6} sx={{
          alignItems: "center",
          justifyContent: 'center',
        }}>
          <SleepInfo
            userName={"Tset_Name"}
            sleepDebt={999}
          // sleepSaving={}
          />
          <Box sx={{
            alignItems: "center",
            justifyContent: 'center',
          }}>
            <h2>理想睡眠時間：{'7.0'} 時間</h2>
            <Button
              onClick={() => dialogDispatch({ type: 'diary' })}
            >
              睡眠日記を書く
            </Button>
          </Box>
        </Grid>

        <Grid item sm={12} md={6}>
          <Calendar
            userId={userId}
          />
        </Grid>

        <Grid item sm={12} md={6}>
          睡眠時間の棒グラフ
        </Grid>

        <Grid item sm={12} md={6}>
          睡眠の質の折れ線グラフ
        </Grid>

        <RecordDialog
          handleClose={() => dialogDispatch({ type: 'close' })}
          open={dialogState.diary}
        />
      </Grid>
    </>
  )
}
