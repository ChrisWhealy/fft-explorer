const arrowStyle = (colourArg, labelArg, fontSizeArg) => (
  {
    style: 5,
    strokeColor: colourArg || 'blue',
    name: labelArg || '',
    fontSize: fontSizeArg || 16 }
)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexAddBox = JXG.JSXGraph.initBoard(
  'complexAddBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    axis: true
  }
);
complexAddBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var addOrigin = complexAddBox.create('point', [0, 0], { style: 10, visible: true, fixed: true, name: '' })
var addX = complexAddBox.create('point', [4, 3], { style: 5, color: 'blue', name: 'x' })
var addY = complexAddBox.create('point', [1, -2], { style: 5, color: 'blue', name: 'y' })
var xyAdd = complexAddBox.create('point', [() => addX.X() + addY.X(), () => addX.Y() + addY.Y()], { style: 7, color: 'green', name: 'x + y' })

complexAddBox.create('arrow', [addOrigin, addX], arrowStyle())
complexAddBox.create('arrow', [addOrigin, addY], arrowStyle())
complexAddBox.create('arrow', [addOrigin, xyAdd], arrowStyle('red'))
complexAddBox.create('arrow', [addX, xyAdd], { strokeColor: 'blue', strokeWidth: 1, dash: 1 })
complexAddBox.create('arrow', [addY, xyAdd], { strokeColor: 'blue', strokeWidth: 1, dash: 1 })

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexSubtractBox = JXG.JSXGraph.initBoard(
  'complexSubtractBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    axis: true
  }
);
complexSubtractBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

var subOrigin = complexSubtractBox.create('point', [0, 0], { style: 10, visible: true, fixed: true, name: '' })
var subX = complexSubtractBox.create('point', [4, 3], { style: 5, color: 'blue', name: 'x' })
var subY = complexSubtractBox.create('point', [1, -2], { style: 5, color: 'blue', name: 'y' })
var xySubtract = complexSubtractBox.create('point', [() => subX.X() - subY.X(), () => subX.Y() - subY.Y()], { style: 7, color: 'green', name: 'x - y' })

complexSubtractBox.create('arrow', [subOrigin, subX], arrowStyle())
complexSubtractBox.create('arrow', [subOrigin, subY], arrowStyle())
complexSubtractBox.create('arrow', [subOrigin, xySubtract], arrowStyle('red'))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let complexMultBox = JXG.JSXGraph.initBoard(
  'complexMultBox',
  {
    boundingbox: [-10, 10, 10, -10],
    showCopyright: false,
    axis: true
  }
);
complexMultBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

const complexMult = (aRe, aIm, bRe, bIm) => ({
  x: aRe * bRe - aIm * bIm,
  y: aRe * bIm + aIm * bRe
})

var mulOrigin = complexMultBox.create('point', [0, 0], { style: 10, visible: true, fixed: true, name: '' })
var mulX = complexMultBox.create('point', [3, 2], { style: 5, color: 'blue', name: 'x' })
var mulY = complexMultBox.create('point', [1, -2], { style: 5, color: 'blue', name: 'y' })
var xyMult = complexMultBox.create('point',
  [
    () => complexMult(mulX.X(), mulX.Y(), mulY.X(), mulY.Y()).x,
    () => complexMult(mulX.X(), mulX.Y(), mulY.X(), mulY.Y()).y,
  ],
  { style: 7, color: 'green', name: 'x * y' }
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
    axis: true
  }
);
complexDivBox.containerObj.style.backgroundColor = OFF_WHITE_BLUE

const complexConjProduct = (re, im) => re * re + im * im
const complexDiv = (aRe, aIm, bRe, bIm) => {
  let num = complexMult(aRe, aIm, bRe, -bIm)
  let denom = complexConjProduct(bRe, bIm)

  return {
    x: num.x / denom,
    y: num.y / denom
  }
}

var divOrigin = complexDivBox.create('point', [0, 0], { style: 10, visible: true, fixed: true, name: '' })
var divX = complexDivBox.create('point', [4, 3], { style: 5, color: 'blue', name: 'x', fontSize: 16 })
var divY = complexDivBox.create('point', [2, -1], { style: 5, color: 'blue', name: 'y', fontSize: 16 })
var xyDiv = complexDivBox.create('point',
  [
    () => complexDiv(divX.X(), divX.Y(), divY.X(), divY.Y()).x,
    () => complexDiv(divX.X(), divX.Y(), divY.X(), divY.Y()).y
  ],
  { style: 7, color: 'green', name: 'x / y', fontSize: 16 }
)
complexDivBox.create('arrow', [divOrigin, divX], arrowStyle())
complexDivBox.create('arrow', [divOrigin, divY], arrowStyle())
complexDivBox.create('arrow', [divOrigin, xyDiv], arrowStyle('green'))
