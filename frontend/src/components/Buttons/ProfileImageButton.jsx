import React, { useRef, useState } from "react";
import AWS from 'aws-sdk'
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
// Api
import { postAvatarImage } from "../../apis/image"

const Container = styled('box')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}));

const OutinedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  marginTop: 15,
  padding: '0px 20px',
}));

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

export const ProfileImageButton = ({ loginUser, user }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState(user.avatar_url);

  // 画像ファイルの選択
  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile);
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
        postAvatarImage({ url: url });
        alert('画像をアップロードしました')
      }
    });
  }

  return (
    <Container>
      <Box>
        <Avatar
          alt="Profile Image"
          src={fileUri}
          sx={{ width: 150, height: 150 }}
          onClick={() => {
            loginUser.id === user.id && inputRef.current.click();
          }}
        />
        <input
          accept="image/*"
          hidden
          type='file'
          onChange={handleChange}
          ref={inputRef}
        />
      </Box>
      {file &&
        <OutinedButton onClick={() => handleUpload(file)}>
          画像アップロード
        </OutinedButton>
      }
    </Container>
  );
};
