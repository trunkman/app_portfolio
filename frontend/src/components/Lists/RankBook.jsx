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
    'card': {
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: 280,
    },
  }),
);

export const RankBook = ({
  book,
  rank,
  countStack,
  countRead,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card sx={{ p: 2 }}>
        <CardActionArea
          className={classes.card}
          component={Link}
          to={`/books/${book.isbn}`}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              <b>{rank}</b> 位
            </Typography>
            <CardMedia
              component="img"
              image={book.largeImageUrl}
              sx={{
                width: 180,
                mx: 'auto',
                pb: 1,
              }}
              alt={book.title}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {book.title}
            </Typography>
            {countRead &&
              <Typography gutterBottom variant="h6">
                読了人数：<b>{countRead}</b>人
              </Typography>
            }
            {countStack &&
              <Typography gutterBottom variant="h6">
                積読人数：<b>{countStack}</b>人
              </Typography>
            }
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
