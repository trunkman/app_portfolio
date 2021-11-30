import React from "react"
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const LoginSignup = ({
  handleOpenLogin,
  handleOpenSignup,
}) => {
  return (
    <>
      <Box sx={{ textAlign: 'center', }} >
        <Typography variant="h5" component="div" >
          <Box sx={{ letterSpacing: 4 }}>"睡眠負債"の返済を手助けする救済サービス</Box>
        </Typography>
        <Typography variant="h1" component="div" >
          <Box sx={{ letterSpacing: 6, my: 2 }}>睡眠補完計画</Box>
        </Typography>
      </Box >
      <Box sx={{
        mt: 6,
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>
        <Button onClick={() => handleOpenSignup()}>
          新規登録
        </Button>
        <Button onClick={() => handleOpenLogin()}>
          ログイン
        </Button>
      </Box>
    </>
  )
}
