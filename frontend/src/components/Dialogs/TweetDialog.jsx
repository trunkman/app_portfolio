import React, { useContext, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../App";
import AWS from 'aws-sdk'
// Style
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// Api
import { postMicropost } from '../../apis/microposts';
// Reducer
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { Content } from '../Forms/Content';

// AWS設定
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
})
const myBucket = new AWS.S3({
  region: process.env.REACT_APP_AWS_REGION,
  signatureVersion: 'v4',
})

export const TweetDialog = ({
  open,
  handleClose,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // 画像ファイルの選択
  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile);
    setFileUri(URL.createObjectURL(selectedFile));
    setImageUrl(`https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/micropost/${selectedFile.name}`);
  }

  // 画像ファイルのアップロード
  const imageUpload = () => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `micropost/${file.name}`,
      ContentType: file.type,
      Body: file,
      Metadata: {
        data: JSON.stringify({
          uploadTime: 60,
        })
      }
    };
    myBucket.putObject(params, (err, data) => {
      if (err) {
        console.log("Err: upload failed :" + err);
      } else {
        console.log("Success: upload ok :" + imageUrl);
      }
    });
  }

  // 投稿を登録する
  const submitPost = () => {
    postDispatch({ type: 'posting' });
    file && imageUpload()
    postMicropost({
      content: postState.content,
      user_id: authState.loginUser.id,
      imageUrl: imageUrl,
    })
      .then(data => {
        postDispatch({ type: 'postSuccess' });
        handleClose();
        history.push(`/users/${authState.loginUser.id}`);
        setFile(null);
        setFileUri(null);
        setImageUrl(null);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        投稿画面
      </DialogTitle>
      <DialogContent>
        <Content
          content={postState.content}
          handleChange={e =>
            postDispatch({
              type: 'input',
              payload: e.target.value,
            })
          }
        />
        <Box>
          <input
            accept="image/*"
            type='file'
            onChange={handleChange}
          />
          {file &&
            <CardMedia
              alt='Image'
              component='img'
              image={fileUri}
              sx={{ width: 200, mt: 2 }}
            />
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitPost} type='submit'  >
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
