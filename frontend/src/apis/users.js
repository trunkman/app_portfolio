import axios from 'axios'
import {
  users, signup, userPath,
  userMicroposts, following, followers,
  userDiaries, userTimeline, userBooks,
  userRooms,
} from '../urls/index'

// ユーザー一覧を取得するapi
export const fetchUsers = () => {
  return axios.get(users, { withCredentials: true })
    .then(res => {
      // console.log('users#index', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#index', error);
    });
}

// ユーザーページを取得するapi
export const fetchUser = (userId) => {
  return axios.get(userPath(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#show', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#show', error);
    });
}

// 新規登録するapi
export const postSignUp = (params) => {
  return axios.post(signup, {
    user: {
      name: params.name,
      email: params.email,
      ideal_sleeping_hours: params.idealSleepingHours,
      password: params.password,
      password_confirmation: params.password_confirmation,
    }
  }, {
    withCredentials: true
  })
    .then(res => {
      // console.log('signup', res);
      return res.data;
    })
    .catch(error => {
      console.log('signup', error);
    });
}

// ユーザー情報を更新するapi
export const patchUpdate = (params) => {
  return axios.patch(userPath(params.user_id), {
    user: {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.passwordConfirmation,
      ideal_sleeping_hours: params.idealSleepingHours,
      profile: params.profile,
    }
  }, {
    withCredentials: true
  })
    .then(res => {
      if (res.data) {
        // console.log('users#update', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('users#update', error);
    });
}

// ユーザーを削除するapi
export const deleteUser = (userId) => {
  return axios.delete(userPath(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#destroy', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#destroy', error);
    });
}

// 投稿一覧(いいね&コメント)を取得するapi
export const fetchMicroposts = (userId) => {
  return axios.get(userMicroposts(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#microposts', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#microposts', error);
    });
}

// フォロー中のユーザーを取得するapi
export const fetchFollowing = (userId) => {
  return axios.get(following(userId), { withCredentials: true })
    .then(res => {
      // console.log('user#following', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#following', error);
    });
}

// フォロワーを取得するapi
export const fetchFollowers = (userId) => {
  return axios.get(followers(userId), { withCredentials: true })
    .then(res => {
      // console.log('user#followers', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#following', error);
    });
}

// 日記を取得するapi
export const fetchUserDiaries = (userId) => {
  return axios.get(userDiaries(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#diaries', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#diaries', error);
    });
}

// タイムラインを取得するapi
export const fetchTimeline = (userId) => {
  return axios.get(userTimeline(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#timeline', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#timeline', error);
    });
}

// ユーザーが登録する本一覧を取得するapi
export const fetchUserBooks = (userId) => {
  return axios.get(userBooks(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#books', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#books', error);
    });
}

// トークルームの一覧を取得するapi
export const fetchRooms = (userId) => {
  return axios.get(userRooms(userId), { withCredentials: true })
    .then(res => {
      // console.log('users#rooms', res);
      return res.data;
    })
    .catch(error => {
      console.log('users#rooms', error);
    });
}
