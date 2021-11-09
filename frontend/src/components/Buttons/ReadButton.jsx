import React from "react";
// styles
import { Button } from "@mui/material";
// api
import { postbook } from "../../apis/books";

export const ReadButton = (props) => {
  const handleClick = (boolean) => {
    postbook({
      read: boolean,
      book: props.book
    })
      .then(data => {
        data.subscription.read
          ? (alert('読んだ本に登録しました'))
          : (alert('積んでいる本に登録しました'))
      })
  }

  // 読んだ積んだがわかるように設定する
  return (
    <>
      <Button
        color="primary"
        onClick={() => handleClick(false)}
        size="small"
      >
        積む
      </Button>
      <Button
        color="primary"
        onClick={() => handleClick(true)}
        size="small"
      >
        読了
      </Button>
    </>
  )
}
