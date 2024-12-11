JXG.COORDS_BY_USER = 1

// Define axis properties
let realTicks = {
  insertTicks: false,
  ticksDistance: 0.2,
  label: 'Real',
}
let imagTicks = {
  insertTicks: false,
  ticksDistance: 0.2,
  label: 'Imaginary',
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let imagRotBox = JXG.JSXGraph.initBoard('imagRotBox', {
  boundingbox: [-1.25, 1.25, 1.25, -1.25],
  axis: true,
  defaultAxes: {
    x: { ticks: realTicks },
    y: { ticks: imagTicks },
  },
  showCopyright: false,
  showNavigation: false,
})
imagRotBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let p = imagRotBox.create(
  'point',
  [1, 0],
  { name: '', face: 'o', size: 5, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 }
)
let arrow = imagRotBox.create('arrow', [[0, 0], p])

let steps = [
  { point: imagRotBox.create('point', [1, 0], { visible: false }), value: "1" },
  { point: imagRotBox.create('point', [0, 1], { visible: false }), value: "i" },
  { point: imagRotBox.create('point', [-1, 0], { visible: false }), value: "-1" },
  { point: imagRotBox.create('point', [0, -1], { visible: false }), value: "-i" }
]
let rotation = 0

imagRotBox.create('text', [0.6, 0.75, () => `i<sup>${rotation}</sup> = ${steps[rotation].value}`], { fontSize: 18 })
setInterval(
  () => {
    rotation = (rotation + 1) % 4
    p.moveTo([steps[rotation].point.X(), steps[rotation].point.Y()], 1600)
  }
  , 2000)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexBox = JXG.JSXGraph.initBoard('complexBox', {
  boundingbox: [-10, 10, 10, -10],
  axis: true,
  showCopyright: false,
  showNavigation: false,
})
complexBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let endPoint = complexBox.create(
  'point',
  [4, 3],
  { name: '', face: 'o', size: 5, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 }
)
let cmplx = complexBox.create('arrow', [[0, 0], endPoint])

const cartesianLabel = () => {
  let x = endPoint.X().toPrecision(3)
  let y = endPoint.Y().toPrecision(3)

  return `Cartesian form: ${x}${y >= 0 ? '+' : ''}${y}i`
}
const polarLabel = () => {
  let hyp = Math.sqrt(endPoint.X() * endPoint.X() + endPoint.Y() * endPoint.Y()).toPrecision(3)
  let angle = (Math.atan2(endPoint.Y(), endPoint.X()) * DEGREES_PER_RADIAN).toPrecision(3)

  return `Polar form: (${hyp}, ${angle}&deg;)`
}
const expLabel = () => {
  let hyp = Math.sqrt(endPoint.X() * endPoint.X() + endPoint.Y() * endPoint.Y()).toPrecision(3)
  let angle = Math.atan2(endPoint.Y(), endPoint.X()).toPrecision(3)

  return `Exponential form: ${hyp}e<sup>${angle}i</sup>`
}

complexBox.create('text', [1.45, 8.5, cartesianLabel], { fontSize: 14 })
complexBox.create('text', [2.35, 7.65, polarLabel], { fontSize: 14 })
complexBox.create('text', [1, 6.9, expLabel], { fontSize: 14 })
