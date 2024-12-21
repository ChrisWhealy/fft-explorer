const ANIMATION_INTERVAL = 80

// Animation direction defaults to forwards
let fwds = true
let idx = 0
let prevIdx = 0
let prevSine = 0
let prevCosine = 1
let sineMemo = []
let cosineMemo = []

// ---------------------------------------------------------------------------------------------------------------------
// Define graphs
let pythagBox = JXG.JSXGraph.initBoard('circleBox', {
  boundingbox: [-1.25, 1.25, 1.25, -1.25],
  keepaspectratio: true,
  axis: true,
  showCopyright: false,
  showNavigation: false,
})
pythagBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let sineBox = JXG.JSXGraph.initBoard('sineBox', {
  boundingbox: [-15, 1.25, 375, -1.25],
  axis: true,
  defaultAxes: { x: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
sineBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

let cosineBox = JXG.JSXGraph.initBoard('cosineBox', {
  boundingbox: [-1.25, -5, 1.25, 375],
  axis: true,
  defaultAxes: { y: { ticks: angleTicks } },
  showCopyright: false,
  showNavigation: false,
})
cosineBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

// ---------------------------------------------------------------------------------------------------------------------
let origin = pythagBox.create('point', [0, 0], { name: 'O', size: 1, face: 'o', fixed: true })
let circumference = pythagBox.create('point', [1, 0], { name: 'C', size: 1, face: 'o', fixed: true })
let xAxis = pythagBox.create('point', [1, 0], { name: 'H', size: 1 })
let yAxis = pythagBox.create('point', [0, 0], { name: 'W', size: 1 })
let circle = pythagBox.create('circle', [origin, circumference], circumferenceStyle)
let height = pythagBox.create('line', [xAxis, circumference], edgeLineStyle)
let width = pythagBox.create('line', [yAxis, circumference], edgeLineStyle)
let radius = pythagBox.create('line', [origin, circumference], radiusLineStyle)
let angleText = pythagBox.create('text', [0.8, 1, () => `&theta; = ${idx}`])

// ---------------------------------------------------------------------------------------------------------------------
// Start/stop button
// Temporarily set runState to true so that the animation starts automatically
let runState = true
let startStop = pythagBox.create('button',
  [-1.1, 1.1,
  () => runState ? "Stop" : "Start",
  () => runState = runState ? clearInterval(runState) : setInterval(animation, ANIMATION_INTERVAL)
  ]
)
let fwdsBckwds = pythagBox.create('button',
  [-0.75, 1.1, () => fwds ? "Backwards" : "Forwards", () => { fwds = !fwds }]
)

// ---------------------------------------------------------------------------------------------------------------------
// Sine wave
let sineXAxis = sineBox.create('point', [0, 0], { name: 'H', size: 1 })
let sineYAxis = sineBox.create('point', [0, 0], { name: 'C', size: 1 })
let sineHeight = sineBox.create('line', [sineXAxis, sineYAxis], edgeLineStyle)

// ---------------------------------------------------------------------------------------------------------------------
// Cosine wave
let cosineXAxis = cosineBox.create('point', [0, 0], { name: 'C', size: 1 })
let cosineYAxis = cosineBox.create('point', [1, 0], { name: 'W', size: 1 })
let cosineHeight = cosineBox.create('line', [cosineXAxis, cosineYAxis], edgeLineStyle)

// ---------------------------------------------------------------------------------------------------------------------
// Animate rotation
let animation = () => {
  let x = circleData[idx].x
  let y = circleData[idx].y

  // Animate the circle
  xAxis.moveTo([x, 0])
  yAxis.moveTo([0, y])
  circumference.moveTo([x, y])

  // Animate the sine and cosine waves
  sineXAxis.moveTo([idx, 0])
  sineYAxis.moveTo([idx, y])
  cosineXAxis.moveTo([x, idx])
  cosineYAxis.moveTo([0, idx])

  // We only need to draw the line sections once
  if ((fwds && idx !== 0) || (!fwds && idx !== 359)) {
    if (!sineMemo[idx])
      sineMemo[idx] = sineBox.create('line', [[prevIdx, prevSine], [idx, y]], sineLineStyle)

    if (!cosineMemo[idx])
      cosineMemo[idx] = cosineBox.create('line', [[prevCosine, prevIdx], [x, idx]], cosineLineStyle)
  }

  prevIdx = idx
  prevCosine = x
  prevSine = y
  idx = fwds ? idx + 1 >= 360 ? 0 : idx + 1 : idx - 1 < 0 ? 359 : idx - 1
}

runState = setInterval(animation, ANIMATION_INTERVAL)
