import React from "react";
// styles
import { Button } from "@mui/material";
// api
import { postbook } from "../../apis/books";

export const ReadButton = ({
  book,
  registration,
}) => {
  const handleClick = (boolean) => {
    registration === true
      // 登済みの本の場合、読了/積読情報の更新
      ? (postbook({
        read: boolean,
        book: book,
      })
        .then(data => {
          if (data.message) {
            alert(data.message)
          } else {
            data.subscription.read
              ? (alert('読んだ本に登録しました'))
              : (alert('積んでいる本に登録しました'))
          }
        }))
      // 未登録本の場合、読書リストに登録
      : (postbook({
        read: boolean,
        book: book,
      })
        .then(data => {
          if (data.message) {
            alert(data.message)
          } else {
            data.subscription.read
              ? (alert('読んだ本に登録しました'))
              : (alert('積んでいる本に登録しました'))
          }
        }))
  }

  // 読んだ積んだがわかるように設定する予定
  return (
    <>
      <Button
        color="primary"
        onClick={() => handleClick("false")}
        size="small"
      >
        積む
      </Button>
      <Button
        color="primary"
        onClick={() => handleClick("true")}
        size="small"
      >
        読了
      </Button>
    </>
  )
}
