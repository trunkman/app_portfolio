import React from 'react';
import { useHistory } from 'react-router-dom';
// Style
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';

const CardWrapper = styled('box')(() => ({
  alignContent: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: 140,
}));

export const BookCard = ({ book }) => {
  const history = useHistory();

  return (
    <CardWrapper onClick={() => history.push(`/books/${book.isbn}`)}>
      <CardMedia
        component="img"
        image={book.largeImageUrl}
        alt={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2">
          {book.title}
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
