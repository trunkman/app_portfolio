import React from "react";
// styles
import Button from "@mui/material/Button";

export const BookSearchButton = (props) => {

  return (
    <Button
      variant="contained"
      size="large"
      type='submit'
      onClick={props.handleSubmit}
    >
      検索する
    </Button>
  )
}
