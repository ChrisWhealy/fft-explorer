// Define phase shift graph
let waveBox = JXG.JSXGraph.initBoard('waveBox', {
  boundingbox: [-15, 1.75, 375, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
waveBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE
const TEXT_Y = 120
const SLIDER_Y_START = TEXT_Y + 35
const SLIDER_Y_END = SLIDER_Y_START + 130
const PHASE_X = 1.6
const FREQ_X = 1.45
const AMP_X = 1.3

let phaseTxt = waveBox.create('text', [TEXT_Y, PHASE_X, 'Phase shift']);
let phaseSlider = waveBox.create('slider', [[SLIDER_Y_START, PHASE_X], [SLIDER_Y_END, PHASE_X], [0, 0, 360]], { snapWidth: 1, precision: 0 });

let freqTxt = waveBox.create('text', [TEXT_Y, FREQ_X, 'Frequency']);
let freqSlider = waveBox.create('slider', [[SLIDER_Y_START, FREQ_X], [SLIDER_Y_END, FREQ_X], [1, 1, 8]]);

let ampTxt = waveBox.create('text', [TEXT_Y, AMP_X, 'Amplitude']);
let ampSlider = waveBox.create('slider', [[SLIDER_Y_START, AMP_X], [SLIDER_Y_END, AMP_X], [1, 1, 0]]);

// Draw the wave
let wave = waveBox.create(
  'functiongraph',
  [x => ampSlider.Value() * Math.cos(freqSlider.Value() * (x + phaseSlider.Value()) % 360 / DEGREES_PER_RADIAN)],
  { size: 1, name: 'B', strokeColor: 'blue' }
)

let p = waveBox.create('point', [60, () => wave.Y(60)], { name: 'P', size: 1, fixed: true })

waveBox.create('text', [30, AMP_X, () => `Amplitude(P) = ${p.Y().toPrecision(2)}`]);
