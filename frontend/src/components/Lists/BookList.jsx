import React from "react";
import { Link } from "react-router-dom";
// Style
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const BookList = ({ books }) => {

  return (
    <Grid container sx={{
      maxWidth: 1000,
      mx: "auto",
      bgcolor: 'grey.300',
    }}>
      {
        books.map(book =>
          <Grid item key={book.id}
            xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
            {/* <BookList
              book={book}
              dataFatching={dataFatching}
            /> */}
            <Card>
              <CardActionArea
                component={Link}
                to={`/books/${book.isbn}`}
              >
                <CardMedia
                  component="img"
                  image={book.mediumImageUrl}
                  sx={{ height: 100 }}
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
          </Grid>
        )
      }
    </Grid>

  )
}
