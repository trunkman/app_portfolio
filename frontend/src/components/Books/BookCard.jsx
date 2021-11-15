import React from "react";
import { Link } from "react-router-dom";
// styles
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const BookCard = ({ book, dataFatching }) => {


  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/books/${book.isbn}`}
      >
        <CardMedia
          component="img"
          image={book.mediumImageUrl}
          sx={{ height: 100, width: 70 }}
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
      <CardActions>
        <Button size="small" color="primary">
          積む
        </Button>
        <Button size="small" color="primary">
          読了
        </Button>
      </CardActions>
    </Card>
  )
}
