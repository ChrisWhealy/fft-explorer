// ---------------------------------------------------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------------------------------------------------
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

imagRotBox.create('text', [0.6, 0.75, () => `i<sup>${rotation}</sup> = ${steps[rotation].value}`], { fontSize: 18 });

// ---------------------------------------------------------------------------------------------------------------------
// Animate point rotation
setInterval(
  () => {
    rotation = (rotation + 1) % 4
    p.moveTo([steps[rotation].point.X(), steps[rotation].point.Y()], 1600)
  }
  , 2000)
