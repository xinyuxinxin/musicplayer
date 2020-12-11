function start (id, parentId) {
  const numStars = 2000
  const canvas = document.getElementById(id)
  const personbc = document.getElementById(parentId)
  let screenH = personbc.clientHeight
  let screenW = personbc.clientWidth
  canvas.height = screenH
  canvas.width = screenW
  const context = canvas.getContext('2d')
  window.addEventListener('resize', () => {
    screenH = personbc.clientHeight
    screenW = personbc.clientWidth
  })
  for (let i = 0; i < numStars; i++) {
    const x = Math.round(Math.random() * screenW)
    const y = Math.round(Math.random() * screenH)
    const length = Math.round((Math.random() * 2))
    Star(x, y, length, context)
  }
}

function Star (x, y, length, context) {
  context.beginPath()
  context.arc(x, y, length, 0, Math.PI * 2, true)
  context.closePath()
  context.fillStyle = 'white'
  context.fill()
}

export {
  start
}
