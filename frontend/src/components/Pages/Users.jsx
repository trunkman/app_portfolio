import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// styled
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
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

const Container = styled('box')(() => ({
  alignItems: 'center',
  border: 1,
  justifyContent: 'center',
  maxWidth: 600,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const ListItemWrapper = styled(ListItem)(() => ({
  alignItems: 'center',
  display: 'flex',
  borderRadius: 2,
}));

const ListTitle = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  lineHeight: 2,
}));

export const Users = ({ loginUser }) => {
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
    <Container>
      <Typography variant="h3">
        <Title>ユーザー一覧</Title>
      </Typography>
      {users.map(user =>
        <ListItemWrapper key={user.id.toString()} >
          <ListItemAvatar>
            <AccountCircle sx={{ fontSize: 60 }} />
          </ListItemAvatar>
          <Box
            onClick={() => history.push(`/users/${user.id}`)}
            sx={{ py: 3, pl: 3, flexGrow: 1 }}
          >
            <ListItemText>
              <Typography variant="h5">
                <ListTitle>{user.name}</ListTitle>
              </Typography>
              <Typography variant="subtitle1" >
                <ListBody>{user.profile}</ListBody>
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
        </ListItemWrapper>
      )}
    </Container>
  )
}
