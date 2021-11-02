import React, { useState } from "react";
// styles
import { IconButton } from "@mui/material";
// アイコン
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
// api
import { postLike, deleteLike } from "../../apis/likes";
import axios from "axios";

export const LikeBottun = (props) => {
  const likeInit = false
  const [like, setLike] = useState(likeInit)

  const handleLike = () => {
    postLike({
      userId: props.loginUserId,
      micropostId: props.micropostId,
    })
      .then(setLike(true))
  }

  const handleUnlike = () => {
    return axios(deleteLike()
      .then(setLike(false))
    )
  }

  return (
    <>
      {like === true
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
