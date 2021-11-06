import React from "react";
import { Link } from "react-router-dom";
// styles
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const BookCard = () => {
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/books/1`}
      >
        <CardMedia
          component="img"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="表紙画像"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            書籍名：睡眠ブック
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            著者名：睡眠太郎
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
