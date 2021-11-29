import React from "react"
import Box from '@mui/material/Box';

export const SleepInfo = ({
  userName,
  sleepDebt,
  sleepSaving,
}) => {

  return (
    <Box sx={{
      alignItems: "center",
      justifyContent: 'center',
    }}>
      {
        sleepDebt &&
        <Box>
          <h2>{userName}さんの</h2>
          <h1>睡眠負債は{sleepDebt} 時間です</h1>
        </Box>
      }
      {
        sleepSaving &&
        <Box>
          <h3>{userName}さんは目標より</h3>
          <h1>{sleepSaving} 時間</h1>
          <h3>睡眠をとっています</h3>
          <h3>この調子で睡眠時間を確保していきましょう</h3>
        </Box>
      }
      {
        !sleepDebt && !sleepSaving &&
        <Box>
          <h3>{userName}さんは</h3>
          <h1>まだ睡眠日記を記録してありません</h1>
          <h3>睡眠日記を記録していきましょう</h3>
        </Box>
      }
    </Box>
  )
}
