// import React, { useState } from "react"
// import { Link } from "react-router-dom";
// // style
// import { Avatar, ListItem, Typography } from "@mui/material";
// import Button from '@mui/material/Button';
// import Grid from "@mui/material/Grid";
// import Skeleton from '@material-ui/lab/Skeleton';
// import Box from '@mui/material/Box';
// // アイコン
// import AccountCircle from "@mui/icons-material/AccountCircle";
// // コンポーネント
// import { SettingDialog } from "../Dialogs/SettingDialog";
// import { FollowButton } from "../Buttons/FollowButton";

// export const UserProfile = ({
//   loginUser,
//   profile,
// }) => {
//   // 設定ダイアログの開閉
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Box sx={{
//         display: 'flex',
//         alignItems: "flex-start",
//         justifyContent: 'center',
//       }}>
//         <Avatar sx={{ width: 100, height: 100, p: 4 }} >
//           <AccountCircle sx={{ fontSize: 100 }} />
//         </Avatar>
//         <Box flex-grow >
//           <Typography variant="h3">
//             {profile.user.name}
//           </Typography>
//           <Typography variant="body1">
//             {profile.user.profile}
//           </Typography>
//         </Box>
//       </Box>

//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'center',
//       }}>
//         <Button
//           component={Link}
//           to={`/users/${profile.user.id}/following`}
//         >
//           <b>{profile.followingIds.length}</b> フォロー中
//         </Button>
//         <Button
//           flex-grow
//           component={Link}
//           to={`/users/${profile.user.id}/followers`}
//         >
//           <b>{profile.followersIds.length}</b> フォロワー
//         </Button>
//         {
//           (loginUser.id === profile.user.id) ? (
//             <Button onClick={() => { setOpen(true) }}>
//               プロフィール編集
//             </Button>
//           ) : (
//             <FollowButton
//               userId={profile.user.id}
//               followingIds={profile.followingIds}
//             />
//           )
//         }

//         <SettingDialog
//           handleClose={() => { setOpen(false) }}
//           open={open}
//           dataUserFetch={profile.dataUserFetch}
//         />
//       </Box>
//     </>
//   )
// }
