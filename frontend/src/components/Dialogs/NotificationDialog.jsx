import React, { useEffect, useReducer } from 'react';
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from "@material-ui/core/List";
import Typography from '@mui/material/Typography';
// Api
import { fetchNotifications, deleteNotifications } from '../../apis/notifications';
// Reducer
import { notificationReducer, notificationInitialState } from '../../reducer/NotificationReducer'
// Component
import { NotificationComment } from '../Items/NotificationComment';
import { NotificationEntry } from '../Items/NotificationEntry';
import { NotificationFollow } from '../Items/NotificationFollow';
import { NotificationLike } from '../Items/NotificationLike';

const useStyles = makeStyles(() =>
  createStyles({
    'title': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

export const NotificationDialog = ({
  fetchDetailMicropost,
  handleClose,
  open,
}) => {
  const classes = useStyles();
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
    notificationState.notifications.length &&
      deleteNotifications()
        .then(data => {
          notificationDispatch({
            type: 'fetchSuccess',
            payload: data.notifications,
          });
        });
    handleClose();
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
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText >
            {notificationState.notifications.length === 0
              ? <Typography>通知はありません</Typography>
              :
              <>
                <List>
                  {notificationState.notifications.map(element =>
                    <>
                      {element.notification.action === 'like' &&
                        <NotificationLike
                          handleClick={fetchDetailMicropost}
                          handleClose={handleClose}
                          notification={element.notification}
                          visitor_user={element.visitor_user}
                        />
                      }
                      {element.notification.action === 'comment' &&
                        <NotificationComment
                          handleClick={fetchDetailMicropost}
                          handleClose={handleClose}
                          notification={element.notification}
                          visitor_user={element.visitor_user}
                        />
                      }
                      {element.notification.action === 'follow' &&
                        <NotificationFollow
                          handleClose={handleClose}
                          notification={element.notification}
                          visitor_user={element.visitor_user}
                        />
                      }
                      {element.notification.action === 'entry' &&
                        <NotificationEntry
                          handleClose={handleClose}
                          notification={element.notification}
                          visitor_user={element.visitor_user}
                        />
                      }
                    </>
                  )}
                </List>
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={allDelete}>
            通知削除
          </Button>
          <Button onClick={() => { handleClose() }}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
