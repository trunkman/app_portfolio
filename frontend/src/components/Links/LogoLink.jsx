import React from "react";
import { Link } from "react-router-dom";
// Style
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// Icon
import AirlineSeatFlatAngledSharpIcon from '@mui/icons-material/AirlineSeatFlatAngledSharp';

export const LogoLink = () => {
  return (
    <Box sx={{ pl: 2 }}>
      <Button
        component={Link}
        sx={{ letterSpacing: 4 }}
        to={`/`}
      >
        <AirlineSeatFlatAngledSharpIcon sx={{ mr: 1 }} />
        <b>睡眠補完計画</b>
      </Button>
    </Box>
  )
}
