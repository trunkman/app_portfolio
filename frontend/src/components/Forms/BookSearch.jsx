import React from "react";
// styles
import TextField from '@mui/material/TextField';
// アイコン
import SearchIcon from '@mui/icons-material/Search';

export const BookSearch = (props) => {

  return (
    <>
      <SearchIcon />
      <TextField
        autoFocus
        margin="dense"
        // id="bookSerch"
        label="書籍名を入力してください"
        sx={{ m: 1, width: '50ch' }}
        type="text"
        required
        variant="standard"
      />
    </>
  )
}
