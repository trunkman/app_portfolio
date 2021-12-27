import React, { useRef, useState } from "react";
import AWS from 'aws-sdk'
import axios from "axios";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Api
import { fetchPresigned, putS3, postAvatarImage } from "../../apis/image"

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    'button': {
      borderRadius: 50,
      height: '100%',
      width: '100%',
      padding: '1px',
    }
  }),
);

// AWS設定
const env = process.env
const S3_BUCKET = env.REACT_APP_AWS_BUCKET
AWS.config.update({
  accessKeyId: env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: env.REACT_APP_AWS_SECRET_KEY
})
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: env.REACT_APP_AWS_REGION,
})

export const ProfileImageButton = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState('#');
  // 画像ファイルの選択
  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setFileUri(URL.createObjectURL(selectedFile));
    console.log(selectedFile);
  }
  // 画像ファイルのアップロード
  const handleUpload = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      CacheControl: "no-cache",
      ContentType: file.type,
      Expires: 60,
      Key: `avatar/${file.name}`
    }
    console.log(params)

    return new Promise((resolve, reject) => {
      myBucket.getSignedUrl('putObject', params, (err, url) => {
        if (err) { reject(err); }
        resolve(url);
        console.log(url)
        return axios.put(url, file, { headers: { 'Content-Type': file.type } })
          .then(res => console.log(res))
      })
    })
  }

  return (
    <Box className={classes.root}>
      <Avatar sx={{
        alignItems: 'center',
        width: 150, height: 150,
      }} >
        <Button
          variant="contained"
          className={classes.button}
          component="span"
          onClick={() => inputRef.current.click()}
        >
          {fileUri === null
            ? <AccountCircle sx={{ fontSize: 150 }} />
            : <img src={fileUri} />
          }
        </Button>
        <input
          accept="image/*"
          hidden
          type='file'
          onChange={handleChange}
          ref={inputRef}
        />
      </Avatar>

      {file &&
        <Button
          onClick={() => handleUpload(file)}
        >
          画像アップロード
        </Button>
      }
    </Box>
  );
};
