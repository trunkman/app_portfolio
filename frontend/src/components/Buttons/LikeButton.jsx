import React, { useEffect, useState } from "react";
// styles
import { IconButton } from "@mui/material";
// アイコン
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
// api
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
    <>
      {likeStatus === true
        ?
        <IconButton onClick={handleUnlike} >
          <FavoriteIcon sx={{ color: red[500] }} />
        </IconButton>
        :
        <IconButton onClick={handleLike} >
          <FavoriteBorderIcon color="primary" />
        </IconButton>
      }
    </>
  )
}
