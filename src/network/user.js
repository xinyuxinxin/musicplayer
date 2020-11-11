import axios from './server'

/**
 * @method 手机登录
 * @params phone 用户id
 */
export const login = (phone, password) =>
  axios.get(`/login/cellphone?phone=${phone}&password=${password}`, {
    withCredentials: true
  })

/**
 * @method 获取用户详情
 * @params uid 用户id
 */
export const getUserDetail = uid => axios.get(`/user/detail?uid=${uid}`, {})

/**
 * @method 获取用户播放记录
 * @params uid 用户 id
 * @params type : type=1 时只返回 weekData, type=0 时返回 allData
 */

export const getUserRecord = (uid, type) =>
  axios.get(`/user/record?uid=${uid}&type=${type}`, {})

/**
 * @method 获取用户歌单
 * @params uid 用户 id
 */

export const getUserArtist = uid => axios.get(`/user/playlist?uid=${uid}`, {})
