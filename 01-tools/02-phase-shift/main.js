const LOWER_BOUND = 0
const UPPER_BOUND = 360
const CIRCLE_BOUND = 1.25

let idx = 0

// ---------------------------------------------------------------------------------------------------------------------
// Define circle and phase shift graphs
let circleBox = JXG.JSXGraph.initBoard('circleBox', {
  boundingbox: [-CIRCLE_BOUND, CIRCLE_BOUND, CIRCLE_BOUND, -CIRCLE_BOUND],
  keepaspectratio: true,
  axis: true,
  showCopyright: false,
  showNavigation: false,
})
circleBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let origin = circleBox.create('point', [0, 0], { name: '', size: 1, face: 'o', fixed: true })
let edge = circleBox.create('point', [1, 0], { name: '', visible: false, fixed: true })
let circle = circleBox.create('circle', [origin, edge], circumferenceStyle)
let circumference = circleBox.create('glider', [0.8, 0.6, circle], { name: 'C' })
let radius = circleBox.create('line', [origin, circumference], radiusLineStyle)

let rightPoint = circleBox.create('point', [1.25, () => circumference.Y()], { size: 1, visible: false })
let horizLine = circleBox.create('line', [circumference, rightPoint], edgeLineStyle)

// ---------------------------------------------------------------------------------------------------------------------
let twoWavesBox = JXG.JSXGraph.initBoard('twoWavesBox', {
  boundingbox: [-15, 1.25, UPPER_BOUND + 15, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
twoWavesBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

// ---------------------------------------------------------------------------------------------------------------------
// Draw the sine and cosine waves
let sin1 = twoWavesBox.create('functiongraph', [x => sineDegrees(x), LOWER_BOUND, UPPER_BOUND], { size: 1, strokeColor: 'green' })
let sin2 = twoWavesBox.create('functiongraph', [x => cosineDegrees(x), LOWER_BOUND, UPPER_BOUND], { size: 1, strokeColor: 'blue' })

const updatePhase = () => {
  const deg = Math.atan2(circumference.Y(), circumference.X()) * DEGREES_PER_RADIAN
  sin2.Y = x => sineDegrees(x + deg)
  twoWavesBox.update()
}

circumference.on('drag', updatePhase)
updatePhase()
