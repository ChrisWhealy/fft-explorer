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
