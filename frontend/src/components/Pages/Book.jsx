import React, { useEffect, useState } from "react";
import Link from '@mui/material/Link';
//Style
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Api
import { fetchBook } from "../../apis/books";
// Component
import { ReadButton } from "../../components/Buttons/ReadButton";
import { RecommendButton } from "../../components/Buttons/RecommendButton";

const Container = styled('box')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 800,
  mx: 'auto',
  width: '100%',
  padding: '0px 10px'
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  letterSpacing: theme.typography.body1.letterSpacing,
}));


const TextBox = styled('box')(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
}));

export const Book = ({ bookIsbn }) => {
  const [book, setBook] = useState([])
  const [registration, setResistration] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  // ISBNで特定した本情報を取得する
  const BookInformation = () => {
    fetchBook(bookIsbn)
      .then(data => {
        setBook(data.book[0].params)
        setResistration(data.registration)
        setSubscribed(data.subscribed)
      });
  }

  useEffect(() => BookInformation(), [bookIsbn])

  return (
    <Container>
      <Typography variant="h4" sx={{ width: '100%', py: 2 }}>
        <Title>{book.title}<br /></Title>
        <Divider sx={{ border: 1, my: 2 }} />
      </Typography>
      <Box sx={{ width: 250, mr: 4, mb: 4 }}>
        <CardMedia
          component="img"
          image={book.largeImageUrl}
          sx={{ width: '100%' }}
          alt={book.title}
        />
      </Box>
      <Box>
        <TextBox >
          <Typography variant="h6" sx={{ pt: 1 }}>著者名 ： {book.author}</Typography>
          <Typography variant="h6" sx={{ pt: 1 }}>出版社名 ： {book.publisherName}</Typography>
          <Typography variant="h6" sx={{ pt: 1 }}>出版日 ： {book.salesDate}</Typography>
          <Typography variant="h6" sx={{ pt: 1 }}>定価  ： {book.itemPrice}円</Typography>
          <Typography variant="h6" sx={{ pt: 1 }}>URL  ：
            <Link
              target="_blank"
              href={book.itemUrl}
              px={{ cursor: 'pointer' }}
            >
              {book.itemUrl}
            </Link>
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
        </TextBox>
      </Box>
    </Container>
  )
}
