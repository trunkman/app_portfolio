import React, { useContext, useEffect, useReducer } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
// styles
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { fetchNotifications, deleteNotifications } from '../../apis/notifications';
// Reducer
import { notificationReducer, notificationInitialState } from '../../reducer/NotificationReducer'

const useStyles = makeStyles(() =>
  createStyles({
    'title': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    'button': {
      background: '#42a5f5',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 30,
      padding: '15px 10px',
    }
  }),
);

export const NotificationDialog = ({
  handleClose,
  open,
}) => {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, notificationInitialState);

  // 通知一覧を取得する
  const notifications = () => {
    fetchNotifications()
      .then(data => {
        data &&
          notificationDispatch({
            type: 'fetchSuccess',
            payload: data.notifications,
          });
      });
  }
  // チェック済み通知をすべて削除する
  const allDelete = () => {
    deleteNotifications()
      .then(data => {
        notificationDispatch({
          type: 'fetchSuccess',
          payload: data.notifications,
        });
        notifications();
      });
  }

  useEffect(() => {
    notifications();
  }, [open])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
      >
        <DialogTitle className={classes.title}>
          <Box>
            通知
          </Box>
          <Button className={classes.button} onClick={allDelete}>
            <DeleteOutlinedIcon />
            すべて削除
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText >
            {notificationState.notifications.length === 0 ? <p>通知はありません</p> :
              <>
                <List>
                  {notificationState.notifications.map(notification =>
                    <>
                      {
                        notification.notification.action === 'like' &&
                        <ListItem
                          key={notification.notification.id.toString()}
                        >
                          <Link
                            to={`/users/${notification.visitor_user.id}`}
                            onClick={() => handleClose()}
                          >
                            {notification.visitor_user.name}
                          </Link>
                          さんが{authState.loginUser.name}さんの
                          {notification.notification.micropost_id}にいいねしました。
                        </ListItem>
                      }
                      {
                        notification.notification.action === 'comment' &&
                        <ListItem
                          key={notification.notification.id.toString()}
                        >
                          <Link
                            to={`/users/${notification.visitor_user.id}`}
                            onClick={() => handleClose()}
                          >
                            {notification.visitor_user.name}
                          </Link>
                          さんが{authState.loginUser.name}さんの
                          {notification.notification.comment_id}にコメントしました。

                        </ListItem>
                      }
                      {
                        notification.notification.action === 'follow' &&
                        <ListItem
                          key={notification.notification.id.toString()}
                        >
                          <Link
                            to={`/users/${notification.visitor_user.id}`}
                            onClick={() => handleClose()}
                          >
                            {notification.visitor_user.name}
                          </Link>
                          さんが{authState.loginUser.name}さんをフォローしました。
                        </ListItem>
                      }
                      {
                        notification.notification.action === 'entry' &&
                        <ListItem
                          key={notification.notification.id.toString()}
                        >
                          <Link
                            to={`/users/${notification.visitor_user.id}`}
                            onClick={() => handleClose()}
                          >
                            {notification.visitor_user.name}
                          </Link>
                          さんが{authState.loginUser.name}さん
                          {notification.notification.entry_id}とのトークルームを作りました。
                        </ListItem>
                      }
                    </>
                  )}
                </List>
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose() }}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
