export const login = (name, pwd) => {
  if (name !== '') {
    if (pwd) {
      var lsobj = window.localStorage
      var datajson = JSON.stringify(pwd)
      lsobj.setItem(name, datajson)
    }
  } else {
    console.log('存在空数据')
  }
}

export const getPerson = (name) => {
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

export const logout = (name) => {
  if (name === '') {
    console.log('存在空数据')
    return false
  } else {
    window.localStorage.removeItem(name)
    return true
  }
}
