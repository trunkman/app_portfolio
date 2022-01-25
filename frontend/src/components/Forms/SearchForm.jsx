import React from "react";
// Styles
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const SearchForm = ({ handleChange, keyword }) => {

  return (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <TextField
        autoFocus
        label="書籍名を入力してください"
        margin="dense"
        sx={{ width: '50vmin' }}
        type="text"
        onChange={handleChange}
        value={keyword}
        required
      />
    </Box>
  )
}
