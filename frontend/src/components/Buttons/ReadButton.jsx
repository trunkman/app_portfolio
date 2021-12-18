import React from "react";
// Style
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Api
import { postBook, updateBook } from "../../apis/books";

const useStyles = makeStyles(() =>
  createStyles({
    'stackButton': {
      background: '#0288d1',
      borderRadius: 50,
      color: 'white',
      height: 30,
      padding: '15px 20px',
    },
    'readButton': {
      background: '#0288d1',
      borderRadius: 50,
      color: 'white',
      height: 30,
      padding: '15px 20px',
      marginLeft: 20,
    },
  }),
);

export const ReadButton = ({
  book,
  registration,
  subscribed,
}) => {
  const classes = useStyles();
  const handleClick = boolean => {
    // ユーザー未登録本の場合、CreateでDBに登録する
    !subscribed && (
      postBook({
        read: boolean,
        registration: registration,
        book: book,
      })
        .then(data => {
          // ぺーじ遷移を加える
          data.message &&
            alert(data.message)
        })
    );
    // ユーザー登録済み本の場合、UpdateでDBを更新する
    subscribed && (
      updateBook({
        read: boolean,
        book: book,
      })
        .then(data => {
          // ぺーじ遷移を加える
          data.message &&
            alert(data.message)
        })
    );
  }

  // 読んだ積んだがわかるように設定する予定
  return (
    <Box>
      <Button
        className={classes.stackButton}
        color="primary"
        onClick={() => handleClick("false")}
        variant="outlined"
      >
        積む
      </Button>
      <Button
        className={classes.readButton}
        color="primary"
        onClick={() => handleClick("true")}
      >
        読了
      </Button>
    </Box>
  )
}
