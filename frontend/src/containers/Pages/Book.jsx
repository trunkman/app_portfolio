import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// Api
import { fetchBook } from "../../apis/books";
// Component
import { ReadButton } from "../../components/Buttons/ReadButton";
import { RecommendButton } from "../../components/Buttons/RecommendButton";

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 800,
      mx: 'auto',
      width: '100%',
    },
    'detail': {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 430,
      mx: 'auto',
      paddingLeft: 30,
      width: '100%',
    },
  }),
);

export const Book = ({ bookIsbn }) => {
  const classes = useStyles();
  const [book, setBook] = useState([])
  const [registration, setResistration] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  // ISBNで特定した本情報を取得する
  useEffect(() => {
    fetchBook(bookIsbn)
      .then(data => {
        setBook(data.book[0].params)
        setResistration(data.registration)
        setSubscribed(data.subscribed)
      })
  }, [])

  return (
    <Box className={classes.root}>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Box sx={{ letterSpacing: 6, pb: 2, mb: 4, borderBottom: 1 }}><b>{book.title}</b></Box>
      </Typography>
      <Divider variant='fullWidth' />
      <Box sx={{ width: 250 }}>
        <CardMedia
          component="img"
          image={book.largeImageUrl}
          sx={{ width: '100%' }}
          alt={book.title}
        />
      </Box>
      <Box>
        <Box className={classes.detail} >
          <Typography variant="h6" sx={{ pb: 1 }}>著者名 ： {book.author}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>出版社名 ： {book.publisherName}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>出版日 ： {book.salesDate}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>定価  ： {book.itemPrice}円</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}
            conponent={Link}
            to={book.itemUrl}
          >
            URL  ： {book.itemUrl}
          </Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>楽天レビュー平均 ： {book.reviewAverage}点</Typography>
          <Typography variant="h6" sx={{ pb: 3 }}>楽天レビュー件数 ： {book.reviewCount}件</Typography>
          <Box>
            <ReadButton
              book={book}
              registration={registration}
              subscribed={subscribed}
            />
            <RecommendButton
              bookIsbn={book.isbn}
              registration={registration}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
