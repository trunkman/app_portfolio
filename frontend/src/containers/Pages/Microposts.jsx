import React, { useState, useEffect, useReducer } from "react";
import Link from '@mui/material/Link';
// styled
import { ListItemAvatar, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../../apis/microposts";
import { deleteComment } from "../../apis/comments";
import { fetchMicroposts } from "../../apis/users";
// reducer
import { dataInitialState, dataReducer } from '../../reducer/DataFetchReducer';
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer';
// コンポーネント
import { LikeButton } from "../../components/Buttons/LikeButton";
import { CommentButton } from "../../components/Buttons/CommentButton"
import { Micropost } from "../../components/Microposts/Micropost";
import { MicropostDialog } from "../../components/Dialogs/MicropostDialog";

export const Microposts = (props) => {
  const [microposts, setMicroposts] = useState([])
  const [comments, setComments] = useState([])
  const [likedMicropostIds, setLikedMicropostIds] = useState([])
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState)
  const [openState, openDispatch] = useReducer(dialogReducer, dialogInitialState)

  const dataFetching = () => dataDispatch({ type: 'microposts' })
  const handleOpen = () => openDispatch({ type: 'micropost' })
  const handleClose = () => openDispatch({ type: 'close' })

  // 投稿一覧を取得する
  useEffect(() => {
    fetchMicroposts({ userId: props.userId })
      .then(data => {
        setMicroposts(data.microposts)
        setComments(data.comments)
        setLikedMicropostIds(data.liked_micropost_ids)
        dataDispatch({ type: 'complete' })
      })
    return () => setMicroposts([])
  }, [dataState.microposts])
  // 投稿を削除する（投稿者のみ実行可能）
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
      .then(dataFetching)
  }
  // コメントを削除する（投稿者のみ実行可能）
  const deleteCommentSubmit = (commentId) => {
    deleteComment(commentId)
      .then(dataFetching)
  }

  return (
    <Box>
      <List sx={{ bgcolor: 'background.paper' }}>
        <h2>投稿一覧</h2>
        <p>{microposts.length} つぶやき : {comments.length} コメント</p>
        <Button variant="contained" onClick={handleOpen}>
          投稿
        </Button>
        <MicropostDialog
          handleClose={handleClose}
          open={openState.micropost}
          user={props.loginUser}
          dataFetching={dataFetching}
        />
        {
          microposts.map(micropost =>
            <Micropost
              micropost={micropost}
              loginUserId={props.loginUser.id}
              likedStatus={likedMicropostIds.includes(micropost.id)}
            />
            // <ListItem key={micropost.id.toString()}>
            //   <ListItemAvatar>
            //     <AccountCircle sx={{ fontSize: 40 }} />
            //   </ListItemAvatar>
            //   <ListItemText
            //     component="div"
            //     primary={micropost.id}
            //     secondary={micropost.created_at}
            //   />
            //   {props.loginUser.id === micropost.user_id && (
            //     <Link component="div" onClick={() => deleteSubmit(micropost.id)}>
            //       delete
            //     </Link>
            //   )}
            //   <Typography variant="body1" pl={2}>
            //     {micropost.content}
            //   </Typography>
            //   <LikeButton
            //     loginUserId={props.loginUser.id}
            //     micropostId={micropost.id}
            //     likedStatus={likedMicropostIds.includes(micropost.id)}
            //   />
            //   <CommentButton
            //     loginUserId={props.loginUser.id}
            //     micropostId={micropost.id}
            //   />
            // </ListItem >
          )
        }

        {
          comments.map(comment =>
            <ListItem key={comment.id}>
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 40 }} />
              </ListItemAvatar>
              <ListItemText
                component="div"
                primary={comment.id}
                secondary={comment.created_at}
              />
              {props.loginUser.id === comment.user_id && (
                <Link component="div" onClick={() => deleteCommentSubmit(comment.id)}>
                  delete
                </Link>
              )}
              <Typography variant="body1" pl={2}>
                {comment.content}
              </Typography>
              <LikeButton
                loginUserId={props.loginUser.id}
                micropostId={comment.id}
              />
              <CommentButton
                loginUserId={props.loginUser.id}
                micropostId={comment.id}
              />
            </ListItem >
          )
        }
      </List>
    </Box>
  )
}
