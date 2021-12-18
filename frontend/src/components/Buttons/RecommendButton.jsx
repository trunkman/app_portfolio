import React from "react";
// Style
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Api
import { postRecommend } from "../../apis/recommends";

const useStyles = makeStyles(() =>
  createStyles({
    'recommend': {
      background: '#0288d1',
      border: 0,
      borderRadius: 4,
      color: 'white',
      height: 30,
      padding: '15px 20px',
      margin: '20px 0px'
    },
  }),
);

export const RecommendButton = ({
  bookIsbn,
  registration,
}) => {
  const classes = useStyles();
  // 私のおすすめ睡眠本に登録する
  const submitRecommend = () => {
    postRecommend({ bookIsbn: bookIsbn })
      .then(data => {
        alert(data.message)
      })
  }

  return (
    <Box>
      {registration &&
        <Button
          className={classes.recommend}
          color="primary"
          onClick={submitRecommend}
        >
          私のおすすめにする
        </Button>
      }
    </Box>
  )
}
