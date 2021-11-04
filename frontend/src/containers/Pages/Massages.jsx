import React from "react";
import List from "@mui/material/List";

const useStyles = makeStyles(() =>
  createStyles({
    "messages": {
      height: "400px",
      padding: "0",
      overflow: "auto"
    }
  }),
);

export const Messages = (props) => {
  const classes = useStyles();

  return (
    <>
      <h3>{props.loginUser.name}</h3>
      <List className={classes.messages} id={"scroll-area"}>
        {
          props.messages.map((message, index) => {
            <Message
              text={message.content}
              key={index}
              loginUserId={props.loginUser.id}
            />
          })
        }
      </List>
    </>
  )
}
