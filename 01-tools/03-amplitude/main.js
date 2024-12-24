const LOWER_BOUND = 0
const UPPER_BOUND = 360
const SLIDER_Y_START = 155
const SLIDER_Y_END = SLIDER_Y_START + 130
const PHASE_X = 1.6
const FREQ_X = 1.45
const AMP_X = 1.3

// ---------------------------------------------------------------------------------------------------------------------
// Define phase shift graph
let waveBox = JXG.JSXGraph.initBoard('waveBox', {
  boundingbox: [-15, 1.75, UPPER_BOUND + 15, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
waveBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let phaseSlider = waveBox.create(
  'slider',
  [[SLIDER_Y_START, PHASE_X], [SLIDER_Y_END, PHASE_X], [LOWER_BOUND, 0, UPPER_BOUND]],
  { name: 'Phase Shift', snapWidth: 1, precision: 0 }
)

let freqSlider = waveBox.create('slider', [
  [SLIDER_Y_START, FREQ_X], [SLIDER_Y_END, FREQ_X], [1, 1, 8]
], { name: 'Frequency' })

let ampSlider = waveBox.create('slider', [
  [SLIDER_Y_START, AMP_X], [SLIDER_Y_END, AMP_X], [1, 1, 0]
], { name: 'Amplitude' })

// ---------------------------------------------------------------------------------------------------------------------
// Draw the wave
let wave = waveBox.create(
  'functiongraph',
  [x => ampSlider.Value() * cosineDegrees(freqSlider.Value() * (x + phaseSlider.Value())),
    LOWER_BOUND, UPPER_BOUND],
  { size: 1, name: 'B', strokeColor: 'blue' }
)

let p = waveBox.create('point', [60, () => wave.Y(60)], { name: 'P', size: 1, fixed: true })

waveBox.create('text', [30, AMP_X, () => `Amplitude(P) = ${p.Y().toPrecision(2)}`]);

// ---------------------------------------------------------------------------------------------------------------------
// Define new wave graph
let newWaveBox = JXG.JSXGraph.initBoard('newWaveBox', {
  boundingbox: [-15, 2.1, UPPER_BOUND + 15, -2.1],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
newWaveBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let cosAmpSlider = newWaveBox.create('slider', [[SLIDER_Y_START, 1.75], [SLIDER_Y_END, 1.75], [1, 1, 0]], { name: 'Cosine Amplitude' })
let sineAmpSlider = newWaveBox.create('slider', [[SLIDER_Y_START, 1.55], [SLIDER_Y_END, 1.55], [1, 1, 0]], { name: 'Sine Amplitude' })

let cosWave = newWaveBox.create('functiongraph', [
  x => cosAmpSlider.Value() * cosineDegrees(x), LOWER_BOUND, UPPER_BOUND
], { size: 1, name: 'B', strokeColor: 'blue' }
)
let sinWave = newWaveBox.create('functiongraph', [
  x => sineAmpSlider.Value() * sineDegrees(x), LOWER_BOUND, UPPER_BOUND
], { size: 1, name: 'B', strokeColor: 'green' }
)
let sumWave = newWaveBox.create('functiongraph', [
  x => cosWave.Y(x) + sinWave.Y(x), LOWER_BOUND, UPPER_BOUND
], { size: 1, name: 'B', strokeColor: 'red' }
)
