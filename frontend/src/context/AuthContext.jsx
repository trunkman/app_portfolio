import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchLoggedIn } from "../apis/sessions";

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  // ログイン&ログアウト実行のコールバック関数

  const handleLogIn = (loginUser) => {
    setIsLoggedIn(true);
    setLoginUser(loginUser);
  }
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoginUser({});
  }

  const value = {
    loginUser,
  }

  useEffect(() => {
    fetchLoggedIn()
      .then(data => {
        if (data.logged_in && isLoggedIn === false) {
          handleLogIn(data.user)
        } else if (!data.logged_in && isLoggedIn === true) {
          handleLogOut()
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
