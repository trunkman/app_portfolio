import React, { useEffect, useReducer } from 'react';
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// Api
import { fetchNotifications, deleteNotifications } from '../../apis/notifications';
// Reducer
import { notificationReducer, notificationInitialState } from '../../reducer/NotificationReducer'

export const NotificationDialog = ({
  handleClose,
  open,
}) => {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, notificationInitialState);

  // 通知一覧を取得する
  const notifications = () => {
    fetchNotifications()
      .then(data => {
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
        <DialogTitle >通知</DialogTitle>
        <DialogContent dividers>
          <DialogContentText >
            <Button onClick={allDelete}>
              全て削除する
            </Button>
            <List>
              {notificationState.notifications.map(notification =>
                <>
                  {
                    notification.action == 'like' &&
                    <ListItem
                      key={notification.id.toString()}
                    >
                      {notification.visitor_id}さんが{notification.micropost_id}にいいねしました。
                    </ListItem>
                  }
                  {
                    notification.action == 'comment' &&
                    <ListItem
                      key={notification.id.toString()}
                    >
                      {notification.visitor_id}さんが{notification.comment_id}にコメントしました。

                    </ListItem>
                  }
                  {
                    notification.action == 'follow' &&
                    <ListItem
                      key={notification.id.toString()}
                    >
                      {notification.visitor_id}さんがあなたをフォローしました。
                    </ListItem>
                  }
                  {
                    notification.action == 'entry' &&
                    <ListItem
                      key={notification.id.toString()}
                    >
                      {notification.visitor_id}さんが{notification.entry_id}とのトークルームを作りました。
                    </ListItem>
                  }
                </>
              )}
            </List>
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
