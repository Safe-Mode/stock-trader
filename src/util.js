const RADIX_TEN = 10
const MILLISEC_FACTOR = 1000
const DURATION_TRANSITION_STATE = 0.7

const getRandomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  }
}

export {
  RADIX_TEN,
  MILLISEC_FACTOR,
  DURATION_TRANSITION_STATE,
  getRandomInt,
  getCoords
}
