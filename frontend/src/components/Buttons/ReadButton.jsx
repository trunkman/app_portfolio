import React, { useState } from "react";
// styles
import { Button } from "@mui/material";

// api
import { postLike, postUnlike } from "../../apis/likes";

export const ReadButton = (props) => {
  const likeInit = false
  const [like, setLike] = useState(likeInit)

  const handleLike = () => {
    postLike({
      userId: props.loginUserId,
      micropostId: props.micropostId,
    })
      .then(setLike(true)
      )
  }

  const handleUnlike = () => {
    postUnlike({
      userId: props.loginUserId,
      micropostId: props.micropostId,
    })
      .then(setLike(false)
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
