import React from "react";
// Style
import Button from "@mui/material/Button";
const useUploadButtonStyles = makeStyles((theme) =>
  createStyles({
    input: {
      display: 'none',
    },
  })
);

export const ImageButton = (props) => {
  const classes = useStyles();

  const handleChange = e => {
    const image = getElementById(e.target.id);
    const file = image.files[0];
    // 対象の書名付きURLを取得する
    const presignedObject = fetchPresigned(file.name);
    // S3にPOSTする form に持たせるデータを生成する
    const formData = new FormData();
    for (const key in presignedObject.fields) {
      formData.append(key, presignedObject.fields[key]);
    }
    formData.append('file', file)
    // S3に画像をアップロード
    await postS3({
      presignedObjectUrl: presignedObject.url,
      formData: formData,
    })
      .then(data => {
        const matchedObject = data.match(/<Location>(.*?)<\/Location>/);
        const s3Url = unescape(matchedObject[1]);
        postAvatarImage({ avatarUrl: s3Url });
      })
  }


  return (
    <>
      <Button variant="contained" component="span" {...props}>
        <input
          accept="image/*"
          id='upload-file'
          type='file'
          onChange={handleChange}
          value='画像アップロード'
        />
        test
      </Button>
    </>
  );
};
