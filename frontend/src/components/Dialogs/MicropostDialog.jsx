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

const ListTitle = styled('box')(({ theme }) => ({
  fontWeight: 'bold',
  letterSpacing: theme.typography.body1.letterSpacing,
  lineHeight: 2,
  paddingBottom: 1,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.body1.letterSpacing,
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
            <Typography><b>投稿内容</b></Typography>
            <ListWrapper
              key={micropost.id.toString()}
              sx={{ my: 2, borderTop: 0.2 }}
            >
              <ListItemAvatar>
                <Avatar
                  src={user.avatar_url}
                  sx={{ cursor: 'pointer', height: 35, width: 35 }}
                  onClick={() => history.push(`/users/${user.id}`)}
                />
              </ListItemAvatar>
              <Box sx={{ pb: 2, flexGrow: 1 }}>
                <Typography>
                  <ListTitle>【 {user.name} 】 {micropost.created_at.substr(0, 16).replace('T', ' ')}</ListTitle>
                </Typography>
                <Typography sx={{ pl: 1 }}>
                  <ListBody>{micropost.content}</ListBody>
                </Typography>
                {micropost.image_url &&
                  <CardMedia
                    alt='Image'
                    component='img'
                    image={micropost.image_url}
                    sx={{ mt: 2, width: '90%' }}
                  />
                }
              </Box>
            </ListWrapper >
          </DialogTitle>
          <DialogContent>
            {comments.length !== 0 &&
              <Box>
                <Typography><b>コメント</b></Typography>
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
                      <Box sx={{ pt: 1, flexGrow: 1 }} >
                        <Typography>
                          <ListTitle>【 {comment.user.name} 】 {comment.comment.created_at.substr(0, 16).replace('T', ' ')}</ListTitle>
                        </Typography>
                        <Typography sx={{ pl: 1 }}>
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
