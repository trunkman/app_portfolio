import React from 'react';
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Component
import { Comment } from '../Lists/Comment';

export const MicropostDialog = ({
  comments,
  handleClose,
  loginUser,
  micropost,
  open,
  user,
}) => {

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        <h2>投稿</h2>
        <ListItem
          key={micropost.id.toString()}
          sx={{
            alignItems: "center",
            borderTop: 0.2,
            display: 'flex',
          }}>
          <ListItemAvatar>
            <AccountCircle sx={{ fontSize: 45 }} />
          </ListItemAvatar>
          <Box sx={{ py: 2, flexGrow: 1 }}>
            <Typography variant="h6">
              【 {user.name} さん 】 {micropost.created_at.substr(0, 19).replace('T', ' ')}
            </Typography>
            <Typography variant="h5" sx={{ pl: 1 }}>
              <Box sx={{ letterSpacing: 2, mt: 2 }}>{micropost.content}</Box>
            </Typography>
          </Box>
        </ListItem >
      </DialogTitle>
      <DialogContent>
        {comments.length !== 0 &&
          <Box sx={{ pl: 10 }}>
            <h3>コメント</h3>
            {
              comments.map(comment =>
                <ListItem
                  key={comment.comment.id.toString()}
                  sx={{
                    display: 'flex',
                    alignItems: "center",
                    my: 1,
                    borderTop: 0.2,
                  }}>
                  <ListItemAvatar>
                    <AccountCircle sx={{ fontSize: 35 }} />
                  </ListItemAvatar>
                  <Box sx={{ pt: 2, flexGrow: 1 }} >
                    <Typography>
                      【 {comment.user.name} さん 】 {comment.comment.created_at.substr(0, 19).replace('T', ' ')}
                    </Typography>
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      <Box sx={{ letterSpacing: 2, my: 2 }}>{comment.comment.content}</Box>
                    </Typography>
                  </Box>
                </ListItem>
              )
            }
          </Box>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
