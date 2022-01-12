import React from 'react';
import { useHistory } from "react-router";
// Style
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";

const ListWrapper = styled(ListItem)(() => ({
  alignItems: "center",
  display: 'flex',
  margitTop: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
  paddingLeft: 6,
}));

export const MicropostDialog = ({
  comments,
  handleClose,
  micropost,
  open,
  user,
}) => {
  const history = useHistory();

  return (
    <>
      {open &&
        <Dialog
          open={open}
          onClose={() => handleClose()}
        >
          <DialogTitle>
            <ListWrapper key={micropost.id.toString()}>
              <ListItemAvatar>
                <Avatar
                  src={user.avatar_url}
                  sx={{ cursor: 'pointer', height: 35, width: 35 }}
                  onClick={() => history.push(`/users/${user.id}`)}
                />
              </ListItemAvatar>
              <Box sx={{ py: 2, flexGrow: 1 }}>
                <Typography variant="h6">
                  【 {user.name} さん 】 {micropost.created_at.substr(0, 19).replace('T', ' ')}
                </Typography>
                <Typography variant="h5" sx={{ pl: 1 }}>
                  <ListBody>{micropost.content}</ListBody>
                </Typography>
                {micropost.image_url &&
                  <CardMedia
                    alt='Image'
                    component='img'
                    image={micropost.image_url}
                    sx={{ mt: 2, width: 400 }}
                  />
                }
              </Box>
            </ListWrapper >
          </DialogTitle>
          <DialogContent>
            {comments.length !== 0 &&
              <Box sx={{ pl: 10 }}>
                <h3>コメント</h3>
                {
                  comments.map(comment =>
                    <ListWrapper
                      key={comment.comment.id.toString()}
                      sx={{ my: 1, borderTop: 0.2 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={comment.user.avatar_url}
                          sx={{ cursor: 'pointer', height: 35, width: 35 }}
                          onClick={() => history.push(`/users/${comment.user.id}`)}
                        />
                      </ListItemAvatar>
                      <Box sx={{ pt: 2, flexGrow: 1 }} >
                        <Typography>
                          【 {comment.user.name} さん 】 {comment.comment.created_at.substr(0, 19).replace('T', ' ')}
                        </Typography>
                        <Typography variant="h6" sx={{ pl: 1 }}>
                          <ListBody>{comment.comment.content}</ListBody>
                        </Typography>
                      </Box>
                    </ListWrapper>
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
      }
    </>
  );
}
