// import React from "react";
// import { useHistory } from 'react-router-dom';
// import { Button } from "@mui/material";
// import { deleteLogout } from "../../apis/sessions";

// export const LogOutButton = (props) => {
//   const history = useHistory();
//   const handleLogOut = () => {
//     deleteLogout()
//       .then(() => {
//         props.handleLogOut();
//         history.push(`/`);
//         alert('ログアウトを成功しました');
//       })
//     // .catch(() => {
//     //   alert.error('ログアウトを失敗しました')
//     // })
//   }

//   return (
//     <Button color="inherit" onClick={handleLogOut} >
//       ログアウト
//     </Button>
//   )
// }
