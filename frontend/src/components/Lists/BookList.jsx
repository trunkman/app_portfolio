import React from "react";
// Style
import Grid from "@mui/material/Grid";
// Component
import { BookCard } from '../../components/Lists/BookCard'

export const BookList = ({ books }) => {

  return (
    <Grid container sx={{
      maxWidth: 1000,
      mx: "auto",
      bgcolor: 'grey.300',
    }}>
      {
        books.map(book =>
          <Grid item key={book.isbn.toString()}
            xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
            <BookCard
              book={book}
            />
            {/* <Card>
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
            </Card> */}
          </Grid>
        )
      }
    </Grid>

  )
}
