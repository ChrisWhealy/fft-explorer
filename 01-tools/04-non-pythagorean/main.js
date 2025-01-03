// ---------------------------------------------------------------------------------------------------------------------
// Pythagoras box
let pythagBox = JXG.JSXGraph.initBoard('pythagorasBox', {
  boundingbox: [-1.8, 1.8, 1.8, -1.5],
  keepaspectratio: true,
  axis: false,
  showCopyright: false,
  showNavigation: false,
  withTicks: false,
})
pythagBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

// ---------------------------------------------------------------------------------------------------------------------
let origin = pythagBox.create('point', [0, 0], { name: '', size: 1, face: 'o', fixed: true })
let edge = pythagBox.create('point', [1, 0], { name: '', visible: false, fixed: true })
let circle = pythagBox.create('circle', [origin, edge], circumferenceStyle)

let circumference = pythagBox.create('glider', [0.8, 0.6, circle], { name: 'C' })
let xAxis = pythagBox.create('point', [() => circumference.X(), 0], { name: 'H', size: 1, fixed: true })

pythagBox.create('line', [xAxis, circumference], edgeLineStyle)
pythagBox.create('line', [origin, xAxis], edgeLineStyle)
pythagBox.create('line', [origin, circumference], radiusLineStyle)

// ---------------------------------------------------------------------------------------------------------------------
// Labels for the sides corresponding to sin/cos
pythagBox.create(
  'text',
  [
    () => circumference.X() + (circumference.X() > 0 ? 0.05 : -0.21),
    () => circumference.Y() / 2,
    'sin(&theta;)'
  ],
  {});

pythagBox.create(
  'text',
  [
    () => circumference.X() / 2 - 0.1,
    () => circumference.Y() > 0 ? -0.08 : 0.08,
    'cos(&theta;)'
  ],
  {});

// ---------------------------------------------------------------------------------------------------------------------
// Summary text
pythagBox.create('text',
  [-1.7, 1.78,
  () => `Area of the square on the opposite = ${(circumference.Y() * circumference.Y()).toPrecision(3)}`
  ]
);

pythagBox.create('text',
  [-1.7, 1.65,
  () => `Area of the square on the adjacent = ${(circumference.X() * circumference.X()).toPrecision(3)}`
  ]
);

pythagBox.create('text',
  [-1.035, 1.52,
  () => {
    let oppArea = circumference.X() * circumference.X()
    let adjArea = circumference.Y() * circumference.Y()
    return `Sum of the areas = ${(oppArea + adjArea).toPrecision(3)}`
  }
  ]
);

// ---------------------------------------------------------------------------------------------------------------------
// Create square on the hypotenuse
const squareOnTheHypotenuse = pythagBox.create('polygon', [
  () => [0, 0],
  () => [circumference.X(), circumference.Y()],
  () => {
    let x = circumference.X() - circumference.Y()
    let y = circumference.Y() + circumference.X()

    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        x = circumference.X() + circumference.Y()
        y = circumference.Y() - circumference.X()
      }
    } else if (circumference.Y() <= 0) {
      x = circumference.X() + circumference.Y()
      y = circumference.Y() - circumference.X()
    }

    return [x, y]
  },
  () => {
    let x = -circumference.Y()
    let y = circumference.X()

    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        x = circumference.Y()
        y = -circumference.X()
      }
    } else if (circumference.Y() <= 0) {
      x = circumference.Y()
      y = -circumference.X()
    }

    return [x, y]
  },
], {
  fillColor: PALE_BLUE_TRANS,
  strokeColor: BLUE_GREEN,
})

// ---------------------------------------------------------------------------------------------------------------------
// Create square on the opposite
const squareOnTheOpposite = pythagBox.create('polygon', [
  () => [circumference.X(), circumference.Y()],
  () => {
    let x = circumference.X() + circumference.Y()
    let y = circumference.Y()

    // Check for inversion
    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        x = circumference.X() - circumference.Y()
      }
    } else if (circumference.Y() <= 0) {
      x = circumference.X() - circumference.Y()
    }

    return [x, y]
  },
  () => {
    let x = circumference.X() + circumference.Y()
    let y = 0

    // Check for inversion
    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        x = circumference.X() - circumference.Y()
      }
    } else if (circumference.Y() <= 0) {
      x = circumference.X() - circumference.Y()
    }

    return [x, y]
  },
  () => [xAxis.X(), 0],
], {
  fillColor: PALE_GREEN_TRANS,
  strokeColor: BLUE_GREEN,
})

// ---------------------------------------------------------------------------------------------------------------------
// Create square on the adjacent
const squareOnTheAdjacent = pythagBox.create('polygon', [
  () => [0, 0],
  () => [xAxis.X(), 0],
  () => {
    let x = circumference.X()
    let y = -circumference.X()

    // Check for inversion
    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        y = circumference.X()
      }
    } else if (circumference.Y() <= 0) {
      y = circumference.X()
    }


    return [x, y]
  },
  () => {
    let x = 0
    let y = -circumference.X()

    // Check for inversion
    if (circumference.X() <= 0) {
      if (circumference.Y() > 0) {
        y = circumference.X()
      }
    } else if (circumference.Y() <= 0) {
      y = circumference.X()
    }

    return [x, y]
  },
], {
  fillColor: PALE_GREEN_TRANS,
  strokeColor: BLUE_GREEN,
})
