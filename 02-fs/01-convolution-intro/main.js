const SLIDER_MAX = 360
const FREQUENCY = 5

// Define convolve waves graph
angleTicks.ticksDistance = 90
let wavesBox = JXG.JSXGraph.initBoard('wavesBox', {
  boundingbox: [-15, 1.50, SLIDER_MAX, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
wavesBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let sliderText = wavesBox.create('text', [10, 1.25, 'Phase shift']);
let cosineSlider = wavesBox.create(
  'slider',
  [[45, 1.25], [270, 1.25], [0, 0, 360]],
  { snapWidth: 1, precision: 0 }
)

// Draw the sine and cosine waves
let cosine = wavesBox.create(
  'functiongraph',
  [x => cosineDegreesWithOffset(FREQUENCY * x, cosineSlider.Value() - 90)],
  { size: 1, name: 'B', strokeColor: 'blue' }
)
let sine = wavesBox.create(
  'functiongraph',
  [x => sineDegrees(FREQUENCY * x)],
  { size: 1, name: 'A', strokeColor: 'green' }
)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Define convolution graph
let convBox = JXG.JSXGraph.initBoard('convBox', {
  boundingbox: [-15, 1.50, SLIDER_MAX, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
convBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

// Convolution wave is initially undefined
let convWave = convBox.create(
  'curve',
  [[], []],
  { strokeWidth: 1, strokeColor: 'red', fillColor: 'red', fillOpacity: 0.25 }
)

// Compute convolution
let area = 0

const updateConvolution = () => {
  area = 0
  convWave.dataX = []
  convWave.dataY = []

  for (let x = 0; x <= SLIDER_MAX; x++) {
    let convHeight = sine.Y(x) * cosine.Y(x)
    convWave.dataX.push(x)
    convWave.dataY.push(convHeight)
    area += convHeight
  }

  convBox.update()
}

updateConvolution()

let areaText = convBox.create('text', [10, 1.25, () => `Area under graph = ${area.toPrecision(3)}`])

// Update convolution when the slider changes
cosineSlider.on('drag', updateConvolution)
