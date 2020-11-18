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

/**
 *退出登录
 */
export const logout = () => axios.get('/logout')

/**
 * @method 获取云盘数据
 * @limit 返回数量
 * @offset 偏移量（分页）
 */
export const getcloud = params => axios.get('/user/cloud', { params })

/**
 * @method 获取云盘数据详情
 * @id 歌曲ID
 */

export const getCloudDetail = id => axios.get(`/user/cloud/detail?id=${id}`, {})

/**
 * @method 删除云盘数据
 * @id 歌曲ID
 */

export const delCloud = id => axios.get(`/user/cloud/del?id=${id}`, {})
