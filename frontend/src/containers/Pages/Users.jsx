import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// styled
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { fetchUsers, deleteUser } from "../../apis/users";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      border: 1,
      justifyContent: 'center',
      maxWidth: 600,
      textAlign: 'center',
      width: '100%',
    }
  }),
);

export const Users = ({ loginUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  // ユーザー一覧を取得する
  const userList = () => {
    fetchUsers()
      .then(data => {
        setUsers(data.users)
      });
  }
  // ユーザーを削除する
  const deleteSubmit = (userId) => {
    deleteUser(userId);
    alert('ユーザーを削除しました');
  }

  useEffect(() => {
    userList();
  }, []);

  return (
    <Box className={classes.root}>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Box sx={{ letterSpacing: 10, pb: 1 }}><b>ユーザー一覧</b></Box>
      </Typography>
      {users.map(user =>
        <ListItem
          key={user.id.toString()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            // background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            my: 3,
          }}>

          <ListItemAvatar>
            <AccountCircle sx={{ fontSize: 60 }} />
          </ListItemAvatar>
          <Box
            onClick={() => history.push(`/users/${user.id}`)}
            sx={{
              py: 3,
              pl: 3,
              flexGrow: 1,
            }}
          >
            <ListItemText>
              <Typography variant="h5" sx={{ letterSpacing: 2 }}>
                {user.name} さん
              </Typography>
              <Typography variant="h6" >
                <Box sx={{ letterSpacing: 2, mt: 2 }}>{user.profile}</Box>
              </Typography>
            </ListItemText>
            <Box>
              {loginUser.admin && (
                <IconButton onClick={() => deleteSubmit(user.id)}>
                  <DeleteOutlinedIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </ListItem>
      )}
    </Box>
  )
}
