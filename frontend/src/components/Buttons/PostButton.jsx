import React from "react";
// Style
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const PostButton = ({
  handleClick
}) => {
  return (
    <Typography variant="body1">
      <Box
        onClick={() => handleClick()}
        sx={{
          cursor: 'pointer',
          letterSpacing: 4,
          mr: 3,
        }}
      >
        <b>投稿</b>
      </Box>
    </Typography>
  )
}
