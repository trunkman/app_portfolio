import React from "react";
import { Link } from "react-router-dom";
// styles
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const BookCard = ({
  book
}) => {
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/books/${book.isbn}`}
      >
        <CardMedia
          component="img"
          image={book.mediumImageUrl}
          sx={{ height: 100, width: 200 }}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
