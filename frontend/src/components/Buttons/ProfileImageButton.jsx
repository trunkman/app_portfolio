import React, { useRef, useState } from "react";
import AWS from 'aws-sdk'
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Api
import { postAvatarImage } from "../../apis/image"

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
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
})
const myBucket = new AWS.S3({
  // params: { Bucket: S3_BUCKET },
  region: process.env.REACT_APP_AWS_REGION,
  signatureVersion: 'v4',
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
  }
  // 画像ファイルのアップロード
  const handleUpload = (file) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `avatar/${file.name}`,
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
        const url = `https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/${file.name}`
        console.log("Success: upload ok" + url);
        postAvatarImage({ url: url })
      }
    });
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
            : <img src={fileUri} sx={{ width: '100%', height: '100%' }} />
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
