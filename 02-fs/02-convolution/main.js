const TEST_FREQ = 4
const SIGNAL = [
  new Wave(5, 30, 0.5),
  new Wave(8, 60, 0.3),
  new Wave(10, 80, 0.5)
]
const UPPER_BOUND = 360
const LOWER_BOUND = 1
const SLIDER_LEFT_X = 15
const SLIDER_RIGHT_X = 225
const PHASE_SLIDER_Y = 1.75
const AMP_SLIDER_Y = 1.5
const GRAPH_MARGIN = 20

let cumulativeIntegral = 0
let integralMax = 0

angleTicks.ticksDistance = 90

// ---------------------------------------------------------------------------------------------------------------------
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
const testFreqSlider = sigTestBox.create(
  'slider',
  [
    [SLIDER_LEFT_X, AMP_SLIDER_Y],
    [SLIDER_RIGHT_X, AMP_SLIDER_Y],
    [SIGNAL[0].freq - 2, TEST_FREQ, +SIGNAL.slice(-1)[0].freq + 2]
  ],
  {
    name: 'Test Wave Frequency',
    snapWidth: 0.1,
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
    precision: 2,
    snapWidth: 1,
  }
)

// Signal wave
const signalWave = sigTestBox.create('functiongraph',
  [
    x => generateSignal(SIGNAL, x),
    LOWER_BOUND - 1, UPPER_BOUND
  ],
  { strokeColor: 'blue' }
)

// Test sine wave
const testWave = sigTestBox.create(
  'functiongraph',
  [
    // The test wave phase must vary through one wavelength, so the slider value must be scaled down by the frequency
    x => cosineDegrees(testFreqSlider.Value() * (x + (testPhaseSlider.Value() / testFreqSlider.Value()))),
    LOWER_BOUND - 1, UPPER_BOUND
  ],
  { strokeColor: 'red' }
)

// ---------------------------------------------------------------------------------------------------------------------
// Board 2: Convolution Graph
const convBox = JXG.JSXGraph.initBoard('convBox', {
  boundingbox: [
    LOWER_BOUND - GRAPH_MARGIN,
    1.5,
    UPPER_BOUND + GRAPH_MARGIN,
    -1.5
  ],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showNavigation: false,
  showCopyright: false,
})
convBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

const convolutionCurve = convBox.create('curve', [[], [], 0, UPPER_BOUND + 1], {
  strokeColor: 'green',
  name: 'Convolution',
  fillColor: 'green',
  fillOpacity: 0.25,
})
convolutionCurve.dataX = [...Array(UPPER_BOUND + 2)].map((_, deg) => deg)

// ---------------------------------------------------------------------------------------------------------------------
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
areaBox.create('text', [295, 140, () => `Max: ${integralMax.toPrecision(5)}`], { fontSize: 15 })

// ---------------------------------------------------------------------------------------------------------------------
// Update Convolution and Integral Graphs
const updateGraphs = () => {
  let convolutionHeight = 0

  cumulativeIntegral = 0
  convolutionCurve.dataY = [0]

  for (let x = LOWER_BOUND; x <= UPPER_BOUND; x++) {
    convolutionHeight = signalWave.Y(x) * testWave.Y(x)
    convolutionCurve.dataY.push(convolutionHeight)
    cumulativeIntegral += convolutionHeight
  }

  // When a fill colour is used to shade the area above and below the X axis, the first and last points of that curve
  // must be set to zero, otherwise the shaded area does not sit correctly on the X axis
  convolutionCurve.dataY[UPPER_BOUND + 1] = 0

  cumulativeIntegral = Math.trunc(cumulativeIntegral * 1000) / 1000
  integralMax = Math.max(integralMax, cumulativeIntegral)

  convBox.update()
  areaBox.update()
}

// Update graphs when sliders are moved
testFreqSlider.on('drag', () => {
  integralMax = 0
  updateGraphs()
})
testPhaseSlider.on('drag', updateGraphs)

// Initial graph update
updateGraphs()
