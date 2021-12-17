const { readInput } = require("../file");

const [x1, x2, y1, y2] = readInput()[0]
  .replace('target area: x=', '')
  .replace(' y=', '')
  .split(',')
  .flatMap(str => str.split('..'))
  .map(Number)

function isInTarget([x,y]) {
  if (x > x2 || y < y1) return 1;
  if (x < x1 || y > y2) return -1;
  return 0;
}

function simulate(xVel, yVel, [startX, startY]) {
  let currentPositionX = startX
  let currentPositionY = startY
  let maxY = currentPositionY;

  while (isInTarget([currentPositionX, currentPositionY]) === -1) {
    currentPositionX += xVel
    currentPositionY += yVel
    xVel -= Math.sign(xVel);
    yVel--;
    maxY = Math.max(maxY, currentPositionY)
  }
  return [isInTarget([currentPositionX, currentPositionY]) === 0, maxY]
}

let result = 0
for (let yVel = y1; yVel <= 1000; yVel++) {
  for (let xVel = 0; xVel <= x2; xVel++) {
    const [target] = simulate(xVel, yVel, [0, 0])
    if (target) {
      result++
    }
  }
}

console.log(result)
