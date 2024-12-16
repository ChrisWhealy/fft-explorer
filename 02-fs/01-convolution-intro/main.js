const SLIDER_MAX = 360
const FREQUENCY = 5
const TXT_HEIGHT_PHASE = 1.25

angleTicks.ticksDistance = 90

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Define waves graph
let wavesBox = JXG.JSXGraph.initBoard('wavesBox', {
  boundingbox: [-15, 1.50, SLIDER_MAX, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
wavesBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

wavesBox.create('text', [10, TXT_HEIGHT_PHASE, 'Phase shift']);
let phaseSlider = wavesBox.create('slider', [[45, TXT_HEIGHT_PHASE], [270, TXT_HEIGHT_PHASE], [0, 0, 360]], { snapWidth: 1, precision: 0 })

// Define the signal and test waves
let testWave = wavesBox.create('functiongraph', [x => sineDegrees(FREQUENCY * x + phaseSlider.Value())], { strokeColor: 'blue' })
let signal = wavesBox.create('functiongraph', [x => sineDegrees(FREQUENCY * x)], { strokeColor: 'green' })

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
let convWave = convBox.create('curve', [[], []], { strokeColor: 'red', fillColor: 'red', fillOpacity: 0.25 })

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Define convolution graph
let areaBox = JXG.JSXGraph.initBoard('areaBox', {
  boundingbox: [-15, 220, SLIDER_MAX, -220],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
areaBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let area = 0

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Compute convolution
let areaMemo = []
let prevX, prevArea

const updateConvolution = () => {
  let psv = phaseSlider.Value()
  area = 0

  convWave.dataX = []
  convWave.dataY = []

  // Calculate convolution area for test wave at current phase shift
  for (let x = 0; x <= SLIDER_MAX; x++) {
    let convHeight = signal.Y(x) * testWave.Y(x)

    convWave.dataX.push(x)
    convWave.dataY.push(convHeight)
    area += convHeight
  }

  // Remember area for current phase shift positino
  areaMemo[psv] = area

  // Plot change in convolution area
  if (psv > 0 && areaMemo[psv] !== undefined) {
    areaBox.create('line', [[prevX, prevArea], [psv, area]], sineLineStyle)
  }

  prevX = psv
  prevArea = areaMemo[psv]

  convBox.update()
  areaBox.update()
}

updateConvolution()

let areaText = convBox.create('text', [10, TXT_HEIGHT_PHASE, () => `Area under graph = ${area.toPrecision(3)}`])
let areaPoint = areaBox.create(
  'point',
  [() => phaseSlider.Value(), () => area],
  {
    color: 'blue',
    name: () => (Math.trunc(area * 10000) / 10000).toPrecision(5),
    fontSize: 16
  })

// Update convolution when the slider changes
phaseSlider.on('drag', updateConvolution)
