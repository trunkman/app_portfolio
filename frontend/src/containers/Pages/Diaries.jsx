import React from "react";
// styles
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
// コンポーネント
import { Calendar } from "../../components/UserInfomation/Calendar";

export const Diaries = (props) => {
  const userId = props.match.params.id

  return (
    <Grid container sx={{ py: 10 }}>
      <Grid item
        sm={12}
        textAlign="center"
        sx={{ border: 0.2, p: 2 }}
      >
        <h1>Diary</h1>
      </Grid>
      <Grid item sm={12} md={6} sx={{ border: 0.2, p: 3 }}>
        <Calendar
          userId={userId}
        />
      </Grid>
      <Grid item sm={12} md={6} sx={{ border: 0.2, p: 3 }}>
        <Calendar
          userId={userId}
        />
      </Grid>
    </Grid >
  )
}
