import React, { useRef, useState } from "react";
// Style
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Api
import { fetchPresigned, putS3, postAvatarImage } from "../../apis/image"

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      borderRadius: 50,
      height: '100%',
      width: '100%',
      padding: '1px',
    }
  }),
);

export const ProfileImageButton = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [image, setImage] = useState('https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/sleep-1.png');

  async function handleChange(e) {
    const file = e.target.files[0];
    console.log(file)
    const imageUri = URL.createObjectURL(file);
    setImage(imageUri)
    // 対象の書名付きURLを取得する
    const presignedObject = await fetchPresigned(file.name)
    const fields = presignedObject['fields']
    // S3にPOSTするデータを生成する
    const formData = new FormData();
    for (const key in fields) {
      formData.append(key, fields[key]);
    }
    // Object.keys(fields).forEach((key) => {
    //   formData.append(key, fields[key]);
    // });
    // formData.append('file', {
    //   uri: imageUri,
    //   type: file.type,
    //   name: file.name,
    // });
    // S3に画像をアップロード
    const s3Data = await putS3({
      presignedObjectUrl: `${presignedObject.url}/avatar/${file.name}`,
      formData: formData,
      // formData: Object.assign(presignedObject.fields, { file: file }),
      fileType: file.type
    });
    console.log(s3Data)
    // postAvatarImage({ avatarUrl: })
    // const matchedObject = await s3Data.match(/<Location>(.*?)<\/Location>/);
    // const s3Url = await unescape(matchedObject[1]);
    // DBに画像URLを登録
    // console.log(s3Url)
    // postAvatarImage({ avatarUrl: s3Data });
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl)
  }

  return (
    <>

      <Button
        variant="contained"
        component="span"
        onClick={() => inputRef.current.click()}
        className={classes.button}
      >
        {image === '#'
          ? <AccountCircle sx={{ fontSize: 150 }} />
          : <img src={image} />
        }
      </Button>
      <input
        // accept="image/*"
        hidden
        type='file'
        onChange={e => handleChange(e)}
        ref={inputRef}
      />
    </>
  );
};
