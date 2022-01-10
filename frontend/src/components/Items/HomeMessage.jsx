import React from "react"
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';

const MessageWrapper = styled('box')(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  mx: 'auto',
  paddingTop: 20,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
}));


export const HomeMessage = () => {

  return (
    <MessageWrapper>
      <Typography variant="h5">
        <Title>" 睡眠補完計画 " の３つの魅力</Title>
      </Typography>
      <Box>●</Box>
      <Box>●</Box>
      <Box>●</Box>

    </MessageWrapper>
  )
}
