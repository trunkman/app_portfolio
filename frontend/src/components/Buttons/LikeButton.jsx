import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
// Icom
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Api
import { postLike, postUnlike } from "../../apis/likes";

export const LikeButton = ({
  loginUserId,
  micropostId,
  Status,
}) => {
  const [likeStatus, setLikeStatus] = useState(Status)
  // いいねをつける
  const handleLike = () => {
    postLike({
      userId: loginUserId,
      micropostId: micropostId,
    }).then(setLikeStatus(true)
    )
  }
  // いいねを解除する
  const handleUnlike = () => {
    postUnlike({
      userId: loginUserId,
      micropostId: micropostId,
    }).then(setLikeStatus(false)
    )
  }

  return (
    <Box sx={{ ml: 2 }}>
      {likeStatus === true
        ?
        <IconButton onClick={handleUnlike} >
          <FavoriteIcon sx={{ color: '#d32f2f' }} />
        </IconButton>
        :
        <IconButton onClick={handleLike} >
          <FavoriteBorderIcon />
        </IconButton>
      }
    </Box>
  )
}
