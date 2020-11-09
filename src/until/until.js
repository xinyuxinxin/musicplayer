// 转换时间 t 时间， mul倍数
export const toTime = (t, mul) => {
  var min = Math.floor(t / 60 / mul)
  var s = Math.floor((t - min * 60 * mul) / mul)
  if (s < 10) {
    s = '0' + s
  }
  if (min < 10) {
    min = '0' + min
  }
  return min + ':' + s
}
