import React from "react"
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 1.7,
}));

const Time = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 1.8,
}));


export const SleepInfo = ({
  userName,
  sleepDebt,
  sleepSaving,
}) => {

  return (
    <Box sx={{
      px: 3,
      textAlign: "center",
    }}>
      {sleepSaving
        ? <>
          <Typography variant="h4">
            <Title>{userName}さんの</Title>
          </Typography>
          <Typography variant="h4">
            <Title>余剰睡眠は</Title>
          </Typography>
          <Typography variant="h1">
            <Time>{sleepSaving}時間</Time>
          </Typography>
        </>
        : <>
          <Typography variant="h4">
            <Title>{userName}さんの</Title>
          </Typography>
          <Typography variant="h4">
            <Title>睡眠負債は</Title>
          </Typography>
          <Typography variant="h1">
            <Time>{sleepDebt !== null ? sleepDebt : 0}時間</Time>
          </Typography>
        </>
      }
    </Box>
  )
}
