import React, { useContext } from "react";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
// Dialog
import { RecordDialog } from "../../components/Dialogs/RecordDialog";

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 1.7,
}));

const Time = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 3,
}));

const SubBody = styled('box')(({ theme }) => ({
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
  marginTop: '30px',
}));

export const SleepInfo = ({
  handleClose,
  handoleOpen,
  open,
  recordDispatch,
  recordState,
  sleepDebt,
  sleepSaving,
  userId,
}) => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ px: 3, textAlign: "center" }}>
        {sleepSaving
          ? <>
            <Typography variant="h5">
              <Title>{recordState.user.name}の</Title>
            </Typography>
            <Typography variant="h5">
              <Title>余剰睡眠は</Title>
            </Typography>
            <Typography variant="h2">
              <Time>{sleepSaving}時間</Time>
            </Typography>
          </>
          : <>
            <Typography variant="h5">
              <Title>{recordState.user.name}の</Title>
            </Typography>
            <Typography variant="h5">
              <Title>睡眠負債は</Title>
            </Typography>
            <Typography variant="h2">
              <Time>{sleepDebt !== null ? sleepDebt : 0}時間</Time>
            </Typography>
          </>
        }
        <Box>
          <Typography variant="h6">
            <SubBody>（理想睡眠時間：{recordState.user.ideal_sleeping_hours}時間）</SubBody>
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
              <ContainedButton onClick={() => handoleOpen()}>
                睡眠日記を書く
              </ContainedButton>
            </Box>
          }
        </Box>
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
