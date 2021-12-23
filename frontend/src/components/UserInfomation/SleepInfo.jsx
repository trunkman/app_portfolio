import React from "react"
// Style
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
          <Typography variant="h4">
            <Box sx={{ letterSpacing: 6, my: 2 }}>{userName}さんの睡眠負債は</Box>
          </Typography>
          <Typography variant="h1">
            <Box sx={{ letterSpacing: 16, my: 4 }}><b>{sleepDebt}時間</b></Box>
          </Typography>
          <Typography variant="h5">
            <Box sx={{ letterSpacing: 4, my: 7 }}><b>何はともあれ、まず寝ましょう</b></Box>
          </Typography>
        </Box>
      }
      {
        sleepSaving &&
        <Box>
          <Typography variant="h4">
            <Box sx={{ letterSpacing: 6, my: 2 }}>{userName}さんの余剰睡眠は</Box>
          </Typography>
          <Typography variant="h1">
            <Box sx={{ letterSpacing: 16, my: 4 }}><b>{sleepSaving}時間</b></Box>
          </Typography>
          <Typography variant="h5">
            <Box sx={{ letterSpacing: 4, my: 7 }}><b>素晴らしい睡眠生活です</b></Box>
          </Typography>
        </Box>
      }
      {
        !sleepDebt && !sleepSaving &&
        <Box>
          <Typography variant="h2" component="div" >
            <Box sx={{ letterSpacing: 10, my: 3 }}>さあ</Box>
            <Box sx={{ letterSpacing: 10, my: 3 }}>睡眠を記録</Box>
            <Box sx={{ letterSpacing: 10, my: 3 }}>してみましょう</Box>
          </Typography>
        </Box>
      }
    </Box>
  )
}
