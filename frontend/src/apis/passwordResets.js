import axios from "axios";
import { passwordResets, passwordResetPath } from "../urls";

// パスワード再設定メールを送るapi
export const postPasswordReset = (params) => {
  return axios.post(passwordResets, {
    password_reset: {
      email: params.email
    }
  })
    .then(res => {
      // console.log('passwordReset#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('passwordReset#create', error);
    });
}

// パスワードを再設定するapi
export const patchPasswordReset = (params) => {
  return axios.patch(passwordResetPath(params.passwordResetToken), {
    user: {
      email: params.queryEmail,
      password: params.password,
      password_confirmation: params.passwordConfirmation,
    }
  })
    .then(res => {
      // console.log('passwordReset#patch', res);
      return res.data;
    })
    .catch(error => {
      console.log('passwordReset#patch', error);
    });
}

