import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../App';
// Style
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
// Dialog
import { RecordDialog } from '../../components/Dialogs/RecordDialog';

const UserWrapper = styled('box')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 20,
}));

const UserName = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 3,
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  lineHeight: 2,
}));

const Time = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  lineHeight: 1,
}));

const SubBody = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
}));

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  width: 200,
  padding: '0px 20px',
  margin: '20px 0px',
}));

export const SleepInfo = ({
  handleClose,
  handleOpen,
  open,
  recordDispatch,
  recordState,
  sleepDebt,
  sleepSaving,
  userId,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ py: 3, textAlign: "center" }}>
        <UserWrapper>
          <Avatar
            src={recordState.user.avatar_url}
            sx={{ cursor: 'pointer', height: 35, mt: 0.4, mr: 2, width: 35 }}
            onClick={() => history.push(`/users/${recordState.user.id}`)}
          />
          <Typography>
            <UserName>{recordState.user.name}</UserName>
          </Typography>
        </UserWrapper>
        <Typography>
          <Title>
            {!sleepSaving && '睡眠負債'}
            {sleepSaving && '貯蓄した睡眠'}
          </Title>
        </Typography>
        <Typography>
          <Time>
            {sleepDebt}
            {sleepSaving}
            {!sleepDebt && !sleepSaving && 0}
            時間</Time>
        </Typography>
        <Box sx={{ py: 0.5 }} />
        <Typography variant='body2'>
          {!sleepSaving && '(理想睡眠時間 x 記録日数) - 実質睡眠時間合計 の差'}
          {sleepSaving && '実質睡眠時間合計 - (理想睡眠時間 x 記録日数) の差'}
        </Typography>
        <Box sx={{ py: 1.3 }} />
        <Typography>
          <SubBody>
            理想睡眠時間<br />
            {recordState.user.ideal_sleeping_hours}時間
          </SubBody>
        </Typography>
        {authState.loginUser.id == userId &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* <ContainedButton>
                ツイッターに投稿する
              </ContainedButton> */}
            <ContainedButton onClick={() => handleOpen()}>
              睡眠日記を書く
            </ContainedButton>
          </Box>
        }
      </Box>
      <RecordDialog
        handleClose={handleClose}
        open={open}
        recordDispatch={recordDispatch}
        recordState={recordState}
      />
    </>
  )
}
