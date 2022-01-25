import React from 'react';
import { Link } from 'react-router-dom';
// Style
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Component
import { RecommendReleaseButton } from '../Buttons/RecommendReleaseButton';

const TextWrapper = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: ' 0px 10px',
}));

const CardWrapper = styled(CardActionArea)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 120,
}));

export const BookRecommend = ({ book, notRecommend }) => {

  return (
    <>
      {book !== null &&
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 3, px: 1 }}>
          <TextWrapper>
            <Typography variant="subtitl1">
              ★ おすすめ睡眠本
            </Typography>
            <Typography variant="h6" sx={{ pt: 1 }}>
              <b>{book.title}</b>
            </Typography>
            <RecommendReleaseButton
              notRecommend={notRecommend}
            />
          </TextWrapper>
          <CardWrapper
            component={Link}
            to={`/books/${book.isbn}`}
          >
            <CardMedia
              component="img"
              image={book.largeImageUrl}
              sx={{ width: '100%', mr: 1 }}
              alt={book.title}
            />
          </CardWrapper>
        </Box>
      }
    </>
  );
}
