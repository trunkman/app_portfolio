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
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
          <Button onClick={() => { handleClose() }}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
