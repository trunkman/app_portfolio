// styles
import { IconButton } from "@mui/material";
// アイコン
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
// コンポーネント
import { CommentDialog } from "../Dialogs/CommentDialog";

export const MessageButton = (props) => {
  const submitFollow = () => {
    return axios(postFollow({ userId: props.userId }))
      .then(props.handleFollow(true))
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SmsOutlinedIcon />
      </IconButton>
      <CommentDialog
        handleClose={handleClose}
        open={open}
        loginUserId={props.loginUserId}
        micropostId={props.micropostId}
      />

      <Button
        onClick={submitFollow}
        variant="contained"
      >
        送信
        <DoubleArrowIcon />
      </Button>
    </>
  )
}
