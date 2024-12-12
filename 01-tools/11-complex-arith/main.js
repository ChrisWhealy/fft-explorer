// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexAddBox = JXG.JSXGraph.initBoard(
  'complexAddBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    showNavigation: false,
    axis: true
  }
);
complexAddBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var addOrigin = complexAddBox.create('point', [0, 0], pointStyle(null, null, null, true))
var addX = complexAddBox.create('point', [4, 3], pointStyle(null, "x"))
var addY = complexAddBox.create('point', [1, -2], pointStyle(null, "y"))
var xyAdd = complexAddBox.create(
  'point',
  [
    () => addX.X() + addY.X(),
    () => addX.Y() + addY.Y()
  ],
  pointStyle('green', 'x + y')
)

complexAddBox.create('arrow', [addOrigin, addX], arrowStyle())
complexAddBox.create('arrow', [addOrigin, addY], arrowStyle())
complexAddBox.create('arrow', [addOrigin, xyAdd], arrowStyle('red'))
complexAddBox.create('arrow', [addX, xyAdd], arrowStyle('blue', 1))
complexAddBox.create('arrow', [addY, xyAdd], arrowStyle('blue', 1))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexSubtractBox = JXG.JSXGraph.initBoard(
  'complexSubtractBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    showNavigation: false,
    axis: true
  }
);
complexSubtractBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var subOrigin = complexSubtractBox.create('point', [0, 0], pointStyle(null, null, null, true))
var subX = complexSubtractBox.create('point', [4, 3], pointStyle(null, 'x'))
var subY = complexSubtractBox.create('point', [1, -2], pointStyle(null, 'y'))
var xySubtract = complexSubtractBox.create(
  'point',
  [
    () => subX.X() - subY.X(),
    () => subX.Y() - subY.Y()
  ],
  pointStyle('green', 'x - y')
)

complexSubtractBox.create('arrow', [subOrigin, subX], arrowStyle())
complexSubtractBox.create('arrow', [subOrigin, subY], arrowStyle())
complexSubtractBox.create('arrow', [subOrigin, xySubtract], arrowStyle('red'))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexMultBox = JXG.JSXGraph.initBoard(
  'complexMultBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    showNavigation: false,
    axis: true
  }
);
complexMultBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var mulOrigin = complexMultBox.create('point', [0, 0], pointStyle(null, null, null, true))
var mulX = complexMultBox.create('point', [3, 2], pointStyle(null, 'x'))
var mulY = complexMultBox.create('point', [1, -2], pointStyle(null, 'y'))
var xyMult = complexMultBox.create('point',
  [
    () => complexMult(mulX, mulY).x,
    () => complexMult(mulX, mulY).y,
  ],
  pointStyle('green', 'x * y')
)
complexMultBox.create('arrow', [mulOrigin, mulX], arrowStyle())
complexMultBox.create('arrow', [mulOrigin, mulY], arrowStyle())
complexMultBox.create('arrow', [mulOrigin, xyMult], arrowStyle('green'))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexDivBox = JXG.JSXGraph.initBoard(
  'complexDivBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    showNavigation: false,
    axis: true
  }
);
complexDivBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var divOrigin = complexDivBox.create('point', [0, 0], pointStyle(null, null, null, true))
var divX = complexDivBox.create('point', [4, 3], pointStyle(null, 'x'))
var divY = complexDivBox.create('point', [2, -1], pointStyle(null, 'y'))
var xyDiv = complexDivBox.create('point',
  [
    () => complexDiv(divX, divY).x,
    () => complexDiv(divX, divY).y
  ],
  pointStyle('green', 'x / y')
)
complexDivBox.create('arrow', [divOrigin, divX], arrowStyle())
complexDivBox.create('arrow', [divOrigin, divY], arrowStyle())
complexDivBox.create('arrow', [divOrigin, xyDiv], arrowStyle('green'))
