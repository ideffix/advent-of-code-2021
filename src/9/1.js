const { readInput } = require("../file");
const input = readInput().map(line => line.split('').map(Number))

function isLowPoint(array, i, j) {
  return getVal(array, i, j) < Math.min(
    getVal(array, i+1, j),
    getVal(array, i-1, j),
    getVal(array, i, j+1),
    getVal(array, i, j-1)
  )
}

function getVal(array, i, j) {
  if (i < 0 || i >= array.length || j < 0 || j >= array[i].length) return Infinity;
  return array[i][j]
}

const lowPoints = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (isLowPoint(input, i, j)) {
      lowPoints.push(input[i][j])
    }
  }
}

const result = lowPoints.reduce((acc, num) => acc + num + 1, 0)

console.log(result)
