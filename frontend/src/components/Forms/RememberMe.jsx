import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const RememberMe = (props) => {

  // 返り値：RememberMeのチェックボックス
  return (
    <FormControlLabel
      control={
        <Checkbox defaultChecked
          checked={props.rememberMe}
          onChange={props.handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label="このアカウントを記憶する"
    />
  );
}
