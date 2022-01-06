import React from "react";
import { Link } from "react-router-dom";
// Style
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
// Image
import MainLogo from "../../images/MainLogo.png";
// import AirlineSeatFlatAngledSharpIcon from '@mui/icons-material/AirlineSeatFlatAngledSharp';

export const LogoLink = () => {
  return (
    <Box>
      <Button
        component={Link}
        to={`/`}
      >
        <CardMedia
          alt='MainLogo'
          component='img'
          image={MainLogo}
          sx={{ height: 40, ml: 1.5 }}
        />
      </Button>
    </Box>
  )
}
