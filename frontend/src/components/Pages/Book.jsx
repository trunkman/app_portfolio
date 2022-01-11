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
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const TextBox = styled('box')(() => ({
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
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Title>{book.title}</Title>
        <Divider sx={{ border: 1, mb: 5 }} />
      </Typography>
      <Box sx={{ width: 225, mr: 4 }}>
        <CardMedia
          component="img"
          image={book.largeImageUrl}
          sx={{ width: '100%' }}
          alt={book.title}
        />
      </Box>
      <Box>
        <TextBox>
          <Typography variant="h6" sx={{ pb: 1 }}>著者名 ： {book.author}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>出版社名 ： {book.publisherName}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>出版日 ： {book.salesDate}</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>定価  ： {book.itemPrice}円</Typography>
          <Typography variant="h6" sx={{ pb: 1 }}>URL  ：
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
