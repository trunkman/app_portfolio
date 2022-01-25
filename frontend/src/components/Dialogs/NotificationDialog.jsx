import React from 'react';
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from "@material-ui/core/List";
import Typography from '@mui/material/Typography';
// Api
import { deleteNotifications } from '../../apis/notifications';
// Component
import { NotificationComment } from '../Items/NotificationComment';
import { NotificationEntry } from '../Items/NotificationEntry';
import { NotificationFollow } from '../Items/NotificationFollow';
import { NotificationLike } from '../Items/NotificationLike';

export const NotificationDialog = ({
  fetchDetailMicropost,
  handleClose,
  open,
  notificationState,
  notificationDispatch,
}) => {

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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
      >
        <DialogTitle>
          <Box>
            通知
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText >
            {!notificationState.notifications.length &&
              <Typography>通知はありません</Typography>
            }

            {!!notificationState.notifications.length &&
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
