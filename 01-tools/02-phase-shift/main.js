// Define phase shift graph
let twoWavesBox = JXG.JSXGraph.initBoard('twoWavesBox', {
  boundingbox: [-15, 1.25, 375, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
twoWavesBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let sliderText = twoWavesBox.create('text', [85, 1.1, 'Phase shift']);
let cosineSlider = twoWavesBox.create('slider', [[120, 1.1], [250, 1.1], [0, 90, 360]], { snapWidth: 1, precision: 0 });

// Draw the sine and cosine waves
let sine = twoWavesBox.create('functiongraph', [x => sineDegrees(x)], { size: 1, name: 'A', strokeColor: 'green' })
let cosine = twoWavesBox.create(
  'functiongraph',
  [x => sineDegrees(x + cosineSlider.Value())],
  { size: 1, name: 'B', strokeColor: 'blue' }
)
