import React from "react";
import { useHistory } from "react-router-dom";
// Style
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';

const CardArea = styled('box')(() => ({
  alignContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 320,
}));

export const BookCard = ({ book }) => {
  const history = useHistory();

  return (
    <Card sx={{ p: 2 }}>
      <CardActionArea>
        <CardArea onClick={() => history.push(`/books/${book.isbn}`)}>
          <CardMedia
            component="img"
            image={book.largeImageUrl}
            sx={{ height: '90%', px: 3, }}
            alt={book.title}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {book.author}
            </Typography>
          </CardContent>
        </CardArea>
      </CardActionArea >
    </Card>
  );
}
