import React from "react"
import { useHistory } from "react-router-dom";
// Style
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
// Component
import { FollowButton } from "../Buttons/FollowButton";
import { ProfileEditButton } from "../Buttons/ProfileEditButton";
import { ProfileImageButton } from "../Buttons/ProfileImageButton";

const Container = styled(Grid)(() => ({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  paddingBottom: 20,
}));

const NameField = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  lineHeight: 2,
}));

const ProfileField = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
  marginBottom: 10,
}));

const ProfileList = styled('box')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
}));

const ProfileItem = styled(Button)(() => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 4,
}));

const ItemText = styled('box')(({ theme }) => ({
  fontSize: theme.typography.subtitle2.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: theme.typography.subtitle2.letterSpacing,
  lineHeight: 2,
  padding: '0px 10px'
}));

export const UserInfo = ({
  loginUser,
  open,
  profileState,
  setOpen,
}) => {
  const history = useHistory();

  return (
    <>
      <Container container>
        <Grid xs={12} sm={3}>
          <ProfileImageButton
            loginUser={loginUser}
            user={profileState.user}
          />
        </Grid>
        <Grid xs={12} sm={9}>
          <Box sx={{ pl: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                <NameField>
                  {profileState.user.name}
                </NameField>
              </Typography>
              {loginUser.id === profileState.user.id &&
                <ProfileEditButton
                  dataUserFetch={profileState.dataUserFetch}
                  setOpen={setOpen}
                  open={open}
                />
              }
              {loginUser.id !== profileState.user.id &&
                <FollowButton
                  userId={profileState.user.id}
                  followStatus={profileState.followStatus}
                />
              }
            </Box>
            <Typography>
              <ProfileField>
                {profileState.user.profile}
              </ProfileField>
              <ProfileList>
                <ProfileItem onClick={() => history.push(`/users/${profileState.user.id}/diaries`)}>
                  <ItemText>目標睡眠時間</ItemText>
                  <ItemText>{profileState.user.ideal_sleeping_hours} 時間</ItemText>
                </ProfileItem>
                <ProfileItem onClick={() => history.push(`/users/${profileState.user.id}/following`)}>
                  <ItemText>フォロー中</ItemText>
                  <ItemText>{profileState.followingIds.length} 人</ItemText>
                </ProfileItem>
                <ProfileItem onClick={() => history.push(`/users/${profileState.user.id}/followers`)}>
                  <ItemText>フォロワー</ItemText>
                  <ItemText>{profileState.followersIds.length} 人</ItemText>
                </ProfileItem>
                <ProfileItem onClick={() => history.push(`/users/${profileState.user.id}/books`)}>
                  <ItemText>読了本</ItemText>
                  <ItemText>{profileState.readBooks.length} 冊</ItemText>
                </ProfileItem>
                <ProfileItem onClick={() => history.push(`/users/${profileState.user.id}/books`)}>
                  <ItemText>積読本</ItemText>
                  <ItemText>{profileState.stackBooks.length} 冊</ItemText>
                </ProfileItem>
              </ProfileList>
            </Typography>
          </Box>
        </Grid>
      </Container>
    </>
  )
}
