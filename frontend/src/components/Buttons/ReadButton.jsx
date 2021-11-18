import React from "react";
// styles
import { Button } from "@mui/material";
// api
import { postBook, updateBook } from "../../apis/books";

export const ReadButton = ({
  book,
  registration,
  subscribed,
}) => {

  const handleClick = (boolean) => {
    { // ユーザー未登録本の場合、CreateでDBに登録する
      !subscribed && (
        postBook({
          read: boolean,
          registration: registration,
          book: book,
        })
          .then(data => {
            data.message &&
              alert(data.message)
          })
      )
    }
    { // ユーザー登録済み本の場合、UpdateでDBを更新する
      subscribed && (
        updateBook({
          read: boolean,
          book: book,
        })
          .then(data => {
            data.message &&
              alert(data.message)
          })
      )
    }
  }

  // 読んだ積んだがわかるように設定する予定
  return (
    <>
      <Button
        color="primary"
        onClick={() => handleClick("false")}
      // {!book.read && subscribed && (variant = "contained")}
      >
        積む
      </Button>
      <Button
        color="primary"
        onClick={() => handleClick("true")}
      // {book.read && subscribed && (variant = "contained")}
      >
        読了
      </Button>
    </>
  )
}
