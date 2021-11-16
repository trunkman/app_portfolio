// import React, { createContext, useState, useEffect } from "react";
// import { fetchLoggedIn } from "../apis/sessions";

// export const AuthContext = createContext()

// export const AuthContextProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginUser, setLoginUser] = useState({});

//   // ログイン&ログアウト実行のコールバック関数
//   const handleLogIn = (loginUser) => {
//     setIsLoggedIn(true);
//     setLoginUser(loginUser);
//   }
//   const handleLogOut = () => {
//     setIsLoggedIn(false);
//     setLoginUser({});
//   }
//   // ログイン状態を保持する
//   useEffect(() => {
//     fetchLoggedIn()
//       .then(data => {
//         if (data.logged_in && isLoggedIn === false) {
//           handleLogIn(data.user)
//         } else if (!data.logged_in && isLoggedIn === true) {
//           handleLogOut()
//         }
//       })
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         loginUser,
//         handleLogIn,
//         handleLogOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }
