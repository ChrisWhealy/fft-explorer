let circumferenceStyle = {
  strokeColor: LIGHT_GREY,
  strokeWidth: 1,
}
let radiusLineStyle = {
  strokeColor: MID_BLUE,
  strokeWidth: 2,
  straightFirst: false,
  straightLast: false,
  fixed: true,
}
let sineLineStyle = {
  strokeColor: MID_BLUE,
  strokeWidth: 2,
  straightFirst: false,
  straightLast: false,
  fixed: true,
}
let cosineLineStyle = {
  strokeColor: MID_RED,
  strokeWidth: 2,
  straightFirst: false,
  straightLast: false,
  fixed: true,
}
let edgeLineStyle = {
  strokeColor: MID_GREY,
  strokeWidth: 1,
  straightFirst: false,
  straightLast: false,
  dash: 2,
  fixed: true,
}
let angleTicks = {
  insertTicks: false,
  ticksDistance: 30,
  intl: {
    enabled: true,
    options: {
      style: 'unit',
      unit: 'degree',
      unitDisplay: 'narrow'
    }
  },
}
