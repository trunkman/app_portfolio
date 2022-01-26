import axios from 'axios'
import { login, logout, loggedIn } from '../urls/index'

// ログインするapi
export const postLogIn = (params) => {
  return axios.post(login, {
    session: {
      email: params.email,
      password: params.password,
      remember_me: params.remember_me
    }
  }, {
    withCredentials: true
  })
    .then(res => {
      // console.log('login', res);
      return res.data;
    })
    .catch(error => {
      alert('ログイン失敗。Emailもしくはパスワードが間違っております。');
      console.log('loggIn', error);
      return 'nil';
    });
}

// ログアウトするapi
export const deleteLogout = () => {
  return axios.delete(logout, { withCredentials: true })
    .then(res => {
      // console.log('logout', res);
      return res.data;
    })
    .catch(error => {
      console.log('logout', error);
    });
}

// ログイン状態を追跡するapi
export const fetchLoggedIn = () => {
  return axios.get(loggedIn, { withCredentials: true })
    .then(res => {
      // console.log('loggedIn', res);
      return res.data;
    })
    .catch(error => {
      console.log('loggedIn', error);
    });
}
