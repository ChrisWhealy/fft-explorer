const DARK_GREY = "#444444"
const MID_GREY = "#888888"
const LIGHT_GREY = "#CCCCCC"
const OFF_WHITE_BLUE = "rgb(245, 250, 255, 1)"
const PALE_BLUE_TRANS = "rgba(0, 102, 255, 0.2)"
const PALE_GREEN_TRANS = "rgba(0, 255, 102, 0.2)"
const BLUE_GREEN = "#0066ff"
const MID_BLUE = "#8888FF"
const MID_RED = "#FF8888"
const WHITE = "#FFFFFF"

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Precalculate lookup array of radians per degree
const RADIANS_PER_DEGREE = Math.PI / 180
const DEGREES_PER_RADIAN = 180 / Math.PI
const deg2RadBuffer = [...Array(360)].map((_, deg) => deg * RADIANS_PER_DEGREE)
const deg2Rad = degrees => deg2RadBuffer[degrees]

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Generate the points for a unit circle otrdered anti-clockwise
const circleData = [...Array(360)].map((_, degrees) => ({
  x: Math.cos(deg2Rad(degrees)),
  y: Math.sin(deg2Rad(degrees))
}))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Return JXG point and arrow option objects
const arrowStyle = (colourArg, dashArg) => ({
  strokeColor: colourArg || 'blue',
  strokeWidth: 1,
  dash: dashArg || 0,
})

const pointStyle = (colourArg, labelArg, fontSizeArg, isFixed) => ({
  face: 'o',
  fixed: !!isFixed,
  color: colourArg || 'blue',
  name: labelArg || '',
  fontSize: fontSizeArg || 16,
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Sine and cosine from value in degrees
const sineDegrees = x => Math.sin(x / DEGREES_PER_RADIAN)
const cosineDegrees = x => cosineDegrees(x, 0)
const cosineDegreesWithOffset = (x, offset) => Math.cos((x + offset) % 360 / DEGREES_PER_RADIAN)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Complex arithmetic
const complexMult = (pointA, pointB, useConjugateOfPointB) => {
  let bY = useConjugateOfPointB ? pointB.Y() * -1 : pointB.Y()

  return {
    x: pointA.X() * pointB.X() - pointA.Y() * bY,
    y: pointA.X() * bY + pointA.Y() * pointB.X()
  }
}

const complexConjProduct = point => point.X() * point.X() + point.Y() * point.Y()
const complexDiv = (pointA, pointB) => {
  let num = complexMult(pointA, pointB, true)
  let denom = complexConjProduct(pointB)

  return {
    x: num.x / denom,
    y: num.y / denom
  }
}
