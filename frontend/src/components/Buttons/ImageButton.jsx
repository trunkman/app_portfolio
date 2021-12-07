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
  const classes = useUploadButtonStyles();
  return (
    <label htmlFor={`upload-button-${props.name}`}>
      <input
        accept="image/*"
        className={classes.input}
        id={`upload-button-${props.name}`}
        name={props.name}
        multiple
        type="file"
        onChange={props.onChange}
      />
      <Button variant="contained" component="span" {...props}>
        {props.children}
      </Button>
    </label>
  );
};
