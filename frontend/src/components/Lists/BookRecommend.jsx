import React from "react";
import { Link } from "react-router-dom";
// Style
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    'text': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: ' 0px 20px',
    },
    'image': {
      background: '#334b63',
      display: 'flex',
      flexDirection: 'column',
      width: 150,
    },
  }),
);

export const BookRecommend = ({
  book
}) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.text}>
        <Typography variant="h6" sx={{ pb: 2 }}>
          【 私のおすすめ睡眠本 】
        </Typography>
        <Typography variant="h4" sx={{ pb: 3, pl: 1 }}>
          {book.title}
        </Typography>
        <Typography variant="h6" sx={{ pb: 1, pl: 1 }}>
          著者：{book.author}
        </Typography>
        <Typography variant="h6" sx={{ pb: 1, pl: 1 }}>
          出版社：{book.publisherName}
        </Typography>
      </Box>
      <CardActionArea
        className={classes.image}
        component={Link}
        to={`/books/${book.isbn}`}
      >
        <CardMedia
          component="img"
          image={book.largeImageUrl}
          sx={{ width: '100%' }}
          alt={book.title}
        />
      </CardActionArea>
    </>
  );
}
