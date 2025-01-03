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
// Generate the points for a unit circle ordered anti-clockwise
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
const sineDegrees = x => Math.sin(x % 360 / DEGREES_PER_RADIAN)
const arcSineDegrees = x => Math.asin(x) * RADIANS_PER_DEGREE
const cosineDegrees = x => Math.cos(x % 360 / DEGREES_PER_RADIAN)
const arcCosineDegrees = x => Math.acos(x) * RADIANS_PER_DEGREE
const pointAngleDegrees = p => Math.atan2(p.Y(), p.X()) * DEGREES_PER_RADIAN

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Wave class
class Wave {
  constructor(freq, phase, amp) {
    this.freq = freq
    this.phase = phase
    this.amp = amp
  }

  // Return the Y value for a given X in degrees
  y(x) {
    return this.amp * cosineDegrees(this.phase + (this.freq * x))
  }
}

const generateSignal = (signalComponents, x) =>
  signalComponents.reduce((acc, wave) => {
    acc += wave.y(x)
    return acc
  }, 0)
