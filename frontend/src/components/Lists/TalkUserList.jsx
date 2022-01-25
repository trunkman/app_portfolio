import React from "react"
// Style
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// Component
import { TalkUser } from "../Items/TalkUser";

export const TalkUserList = ({ entries, setOpen, }) => {

  return (
    <List>
      {entries.length === 0 &&
        <ListItemText sx={{ pt: 4 }}>
          <h3>トークしている人はいません。</h3>
        </ListItemText>
      }

      {entries.length !== 0 &&
        <TalkUser
          entries={entries}
          setOpen={setOpen}
        />
      }
    </List>
  );
}
