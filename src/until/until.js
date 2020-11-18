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

// 计算次数
export const playCount = (playCount) => {
  if (playCount > 100000000) {
    return Math.floor(playCount / 100000000) + '亿'
  } else if (playCount > 10000) {
    return Math.floor(playCount / 10000) + '万'
  } else if (this.sheet.playCount > 1000) {
    return Math.floor(playCount / 1000) + '千'
  } else {
    return playCount
  }
}
