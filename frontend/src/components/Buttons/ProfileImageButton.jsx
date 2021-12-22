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
      background: '#444',
      borderRadius: 50,
      height: '100%',
      marginLeft: '100%',
      padding: '1px',
    }
  }),
);

export const ProfileImageButton = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [image, setImage] = useState('#');

  async function handleChange(e) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl)
    console.log(file)
    console.log(file.lastModified)
    const allFile = {}
    allFile.lastModified = file.lastModified
    allFile.lastModifiedDate = file.lastModifiedDate
    allFile.name = file.name
    allFile.size = file.size
    allFile.type = file.name
    allFile.webkitRelativePath = file.webkitRelativePath
    console.log(allFile);
    // 対象の書名付きURLを取得する
    const presignedObject = await fetchPresigned(file.name)
    // S3にPOSTする form に持たせるデータを生成する
    // const formData = new FormData();
    // for (const key in presignedObject.fields) {
    //   formData.append(key, presignedObject.fields[key]);
    // }
    // formData.append('file', file);
    // console.log(formData)
    // for (let value of formData.entries()) {
    //   console.log(value);
    // }
    // S3に画像をアップロード
    const s3Data = await putS3({
      presignedObjectUrl: `${presignedObject.url}/avatar/${file.name}`,
      formData: Object.assign(presignedObject.fields, { file: allFile }),
      fileType: file.type
    });
    console.log(s3Data)
    // postAvatarImage({ avatarUrl: })
    // const matchedObject = await s3Data.match(/<Location>(.*?)<\/Location>/);
    // const s3Url = await unescape(matchedObject[1]);
    // DBに画像URLを登録
    // console.log(s3Url)
    // postAvatarImage({ avatarUrl: s3Data });
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
        accept="image/*"
        hidden
        type='file'
        onChange={e => handleChange(e)}
        ref={inputRef}
      />
    </>
  );
};
