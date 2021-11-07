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
        label="書籍名を入力してください"
        margin="dense"
        // id="bookSerch"
        sx={{ m: 1, width: '50ch' }}
        type="text"
        onChange={props.handleChange}
        value={props.keyword}
        required
        variant="standard"
      />
    </>
  )
}
