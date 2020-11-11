export const set = (name, mes) => {
  if (name !== '') {
    if (mes) {
      var lsobj = window.localStorage
      var datajson = JSON.stringify(mes)
      lsobj.setItem(name, datajson)
    }
  } else {
    console.log('存在空数据')
  }
}

export const get = (name) => {
  if (name !== '') {
    var lsdata = window.localStorage
    try {
      var datajson = lsdata.getItem(name)
      datajson = JSON.parse(datajson)
      return datajson
    } catch (e) {
      return null
    }
  } else {
    return null
  }
}

export const remove = (name) => {
  if (name === '') {
    console.log('存在空数据')
    return false
  } else {
    window.localStorage.removeItem(name)
    return true
  }
}
