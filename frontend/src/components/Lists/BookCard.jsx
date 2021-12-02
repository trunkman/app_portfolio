import React from "react";
import { Link } from "react-router-dom";
// Style
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 320,
    },
  }),
);

export const BookCard = ({
  book
}) => {
  const classes = useStyles();

  return (
    <Card sx={{ p: 2 }}>
      <CardActionArea
        className={classes.root}
        component={Link}
        to={`/books/${book.isbn}`}
      >
        <CardMedia
          component="img"
          image={book.largeImageUrl}
          sx={{
            width: '100%',
            px: 3,
          }}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
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
