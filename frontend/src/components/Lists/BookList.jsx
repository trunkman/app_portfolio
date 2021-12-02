import React from "react";
// Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Component
import { BookCard } from '../../components/Lists/BookCard'

const useStyles = makeStyles(() =>
  createStyles({
    'card': {
      background: '#334b63',
      display: 'flex',
      flexDirection: 'column',
      width: 250,
      height: 385,
      padding: 15,
    },
  }),
);


export const BookList = ({ books }) => {
  const classes = useStyles();

  return (
    <>
      {
        books.map(book =>
          <Box
            className={classes.card}
            key={book.isbn.toString()}
          >
            <BookCard book={book} />
          </Box>
        )
      }
    </>
  )
}
