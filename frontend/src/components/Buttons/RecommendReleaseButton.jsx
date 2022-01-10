import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: '#334b63',
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  marginTop: 15,
  padding: '0px 20px',
}));

export const RecommendReleaseButton = ({ notRecommend }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <ContainedButton onClick={() => setOpen(true)}>
          おすすめを解除
        </ContainedButton>
      </Box>
      <DeleteDialog
        handleClose={() => setOpen(false)}
        handleDelete={notRecommend}
        message={'おすすめ本を解除'}
        open={open}
      />
    </>
  )
}
