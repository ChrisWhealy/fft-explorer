const FREQUENCY = 5
const UPPER_BOUND = 360
const LOWER_BOUND = 0
const SLIDER_LEFT_X = 15
const SLIDER_RIGHT_X = 225
const PHASE_SLIDER_Y = 1.75
const AMP_SLIDER_Y = 1.5
const GRAPH_MARGIN = 20

let cumulativeIntegral = 0
let integralMax = 0
let integralMin = 0

angleTicks.ticksDistance = 90

// ---------------------------------------------------------------------------------------------------------------
// Board 1: Signal and Test Waves
const sigTestBox = JXG.JSXGraph.initBoard('signalTestBox', {
  boundingbox: [
    LOWER_BOUND - GRAPH_MARGIN,
    2,
    UPPER_BOUND + GRAPH_MARGIN,
    -1.2
  ],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showNavigation: false,
  showCopyright: false,
})
sigTestBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

// Sliders for signal amplitude and test phase and amplitude
const testAmpSlider = sigTestBox.create(
  'slider',
  [
    [SLIDER_LEFT_X, AMP_SLIDER_Y],
    [SLIDER_RIGHT_X, AMP_SLIDER_Y],
    [0, 1, 1]
  ],
  {
    name: 'Test Wave Amplitude',
    snapWidth: 0.01,
  }
)
const testPhaseSlider = sigTestBox.create(
  'slider',
  [
    [SLIDER_LEFT_X, PHASE_SLIDER_Y],
    [SLIDER_RIGHT_X, PHASE_SLIDER_Y],
    [LOWER_BOUND, 0, UPPER_BOUND]
  ],
  {
    name: 'Test Wave Phase',
    snapWidth: 0.1,
  }
)

// Signal sine wave
const signalWave = sigTestBox.create('functiongraph', [x => sineDegrees(FREQUENCY * x)], { strokeColor: 'blue' })

// Test sine wave
const testWave = sigTestBox.create(
  'functiongraph',
  [x => testAmpSlider.Value() * sineDegrees(FREQUENCY * (x + testPhaseSlider.Value()))],
  { strokeColor: 'red' }
)

// ---------------------------------------------------------------------------------------------------------------
// Board 2: Convolution Graph
const convBox = JXG.JSXGraph.initBoard('convBox', {
  boundingbox: [
    LOWER_BOUND - GRAPH_MARGIN,
    1.1,
    UPPER_BOUND + GRAPH_MARGIN,
    -1.1
  ],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showNavigation: false,
  showCopyright: false,
})
convBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

const convolutionGraph = convBox.create('curve', [[], []], {
  strokeColor: 'green',
  name: 'Convolution',
  fillColor: 'green',
  fillOpacity: 0.25,
})

// ---------------------------------------------------------------------------------------------------------------
// Board 3: Integral of Convolution
const areaBox = JXG.JSXGraph.initBoard('areaBox', {
  boundingbox: [
    LOWER_BOUND - GRAPH_MARGIN,
    (UPPER_BOUND / 2) + GRAPH_MARGIN,
    UPPER_BOUND + GRAPH_MARGIN,
    (UPPER_BOUND / -2) - GRAPH_MARGIN
  ],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showNavigation: false,
  showCopyright: false,
})
areaBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let areaPoint = areaBox.create(
  'point',
  [() => testPhaseSlider.Value(), () => cumulativeIntegral],
  {
    color: 'blue',
    name: () => cumulativeIntegral,
    fontSize: 16
  })
areaBox.create('text', [293, 140, () => `Max: ${integralMax.toPrecision(5)}`], { fontSize: 15 })
areaBox.create('text', [295, 120, () => `Min: ${integralMin.toPrecision(5)}`], { fontSize: 15 })

// ---------------------------------------------------------------------------------------------------------------
// Update Convolution and Integral Graphs
const updateGraphs = () => {
  let convolutionHeight = 0

  cumulativeIntegral = 0
  convolutionGraph.dataX = []
  convolutionGraph.dataY = []

  for (let x = LOWER_BOUND; x <= UPPER_BOUND; x++) {
    convolutionHeight = signalWave.Y(x) * testWave.Y(x)
    convolutionGraph.dataX.push(x)
    convolutionGraph.dataY.push(convolutionHeight)
    cumulativeIntegral += convolutionHeight
  }

  cumulativeIntegral = Math.trunc(cumulativeIntegral * 1000) / 1000
  integralMax = Math.max(integralMax, cumulativeIntegral)
  integralMin = Math.min(integralMin, cumulativeIntegral)

  convBox.update()
  areaBox.update()
}

// Update graphs when sliders are moved
testAmpSlider.on('drag', () => {
  integralMax = 0
  integralMin = 0
  updateGraphs()
})
testPhaseSlider.on('drag', updateGraphs)

// Initial graph update
updateGraphs()
