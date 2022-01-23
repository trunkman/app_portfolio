import React from 'react';
import { useHistory } from 'react-router-dom';
// Style
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CardWrapper = styled('box')(() => ({
  alignContent: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: 200,
}));

export const RankBookItem = ({
  book,
  rank,
  countStack,
  countRead,
}) => {
  const history = useHistory();

  return (
    <CardWrapper onClick={() => history.push(`/books/${book.isbn}`)}>
      <Typography gutterBottom variant="h5">
        <b>{rank}</b> 位
      </Typography>
      <CardMedia
        component="img"
        image={book.largeImageUrl}
        alt={book.title}
        sx={{ mb: 1, mx: 'auto', width: 150 }}
      />
      <Typography variant="subtitle1" color="text.secondary">
        {book.title}
      </Typography>
      {countRead &&
        <Typography gutterBottom variant="subtitle1">
          読了人数：<b>{countRead}</b>人
        </Typography>
      }

      {countStack &&
        <Typography gutterBottom variant="subtitle1">
          積読人数：<b>{countStack}</b>人
        </Typography>
      }
    </CardWrapper>
  );
}
