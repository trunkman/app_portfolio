import React from "react";
// Style
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Api
import { fetchPresigned, postS3, postAvatarImage } from "../../apis/image"

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      background: '#444',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 30,
      marginLeft: 8,
      padding: '15px 20px',
    }
  }),
);

export const ImageButton = (props) => {
  const classes = useStyles();

  async function handleChange(e) {
    const file = e.target.files[0];
    const resData = fetchPresigned(file.name)
    const data = await resData
    // 対象の書名付きURLを取得する
    // S3にPOSTする form に持たせるデータを生成する
    const formData = new FormData();
    for (let key in data.fields) {
      formData.append(key, data.fields[key]);
    }
    formData.append('file', file)
    // S3に画像をアップロード
    const ret = await postS3({
      presignedObjectUrl: data.url,
      formData: formData,
    })
    const matchedObject = await ret.match(/<Location>(.*?)<\/Location>/);
    const s3Url = await unescape(matchedObject[1]);
    // DBに画像URLを登録
    console.log(s3Url)
    // postAvatarImage({ avatarUrl: s3Url });
  }

  // const handleChange = e => {
  //   const file = e.target.files[0];
  //   // 対象の書名付きURLを取得する
  //   fetchPresigned(file.name)
  //     // S3にPOSTする form に持たせるデータを生成する
  //     .then(data => {
  //       const formData = new FormData();
  //       for (let key in data.fields) {
  //         formData.append(key, data.fields[key]);
  //       }
  //       formData.append('file', file)
  //       // S3に画像をアップロード
  //       postS3({
  //         presignedObjectUrl: data.url,
  //         formData: formData,
  //       })
  //         .then(data => {
  //           const matchedObject = data.match(/<Location>(.*?)<\/Location>/);
  //           const s3Url = unescape(matchedObject[1]);
  //           // DBに画像URLを登録
  //           console.log(s3Url)
  //           // postAvatarImage({ avatarUrl: s3Url });
  //         })
  //     })
  // }


  return (
    <>
      <Button
        variant="contained"
        component="span"
        className={classes.button}
      >
        <input
          accept="image/*"
          id='upload-file'
          type='file'
          onChange={e => handleChange(e)}
        />
      </Button>
    </>
  );
};
