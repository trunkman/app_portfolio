import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const RememberMe = ({ rememberMe, handleChange }) => {

  // 返り値：RememberMeのチェックボックス
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={rememberMe}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label="このアカウントを記憶する"
    />
  );
}
