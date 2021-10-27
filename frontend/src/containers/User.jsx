import React, { useState, useEffect } from "react";
// styled
import { Grid } from "@mui/material";
// コンポーネント
import { Profile } from "../components/Profile";
import { Microposts } from "../components/Microposts";

export const User = (props) => {
  // 返り値：Userページ
  return (
    <Grid container sx={{ width: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <Profile
          isLoggedIn={props.isLoggedIn}
          loginUser={props.loginUser}
        />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <Microposts
          loginUser={props.loginUser}
          urlUserId={props.match.params.id}
        />
      </Grid>
    </Grid>
  )
}
