JXG.COORDS_BY_USER = 1

// Define phase shift graph
let imagRotBox = JXG.JSXGraph.initBoard('imagRotBox', {
  boundingbox: [-1.25, 1.25, 1.25, -1.25],
  axis: true,
  showCopyright: false,
  showNavigation: false,
})
imagRotBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let right = imagRotBox.create('point', [1, 0], { visible: false })
let up = imagRotBox.create('point', [0, 1], { visible: false })
let left = imagRotBox.create('point', [-1, 0], { visible: false })
let down = imagRotBox.create('point', [0, -1], { visible: false })

let rotation = 0
let value = 1
let p = imagRotBox.create(
  'point',
  [1, 0],
  { name: '', face: 'o', size: 5, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 }
)
let arrow = imagRotBox.create('arrow', [[0,0], p])
imagRotBox.create('text', [0.6, 0.75, () => `i<sup>${rotation}</sup> = ${value}`], { fontSize: 18 });

setInterval(() => {
  rotation = (rotation + 1) % 4

  let newP

  switch (rotation) {
    case 1:
      newP = up
      value = 'i'
      break
    case 2:
      newP = left
      value = '-1'
      break
    case 3:
      newP = down
      value = '-i'
      break
    default:
      newP = right
      value = '1'
  }

  p.moveTo([newP.X(), newP.Y()], 1600)
}
  , 2000)
