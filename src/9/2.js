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

function exploreBasin(array, i, j, val, visited) {
  if (i < 0 || i >= array.length || j < 0 || j >= array[i].length || array[i][j] < val || visited[i][j] || array[i][j] === 9) return 0;
  visited[i][j] = true

  return 1 +
    exploreBasin(array, i+1, j, array[i][j]+1, visited) +
    exploreBasin(array, i-1, j, array[i][j]+1, visited) +
    exploreBasin(array, i, j+1, array[i][j]+1, visited) +
    exploreBasin(array, i, j-1, array[i][j]+1, visited);
}

const basins = [];

const visited = new Array(input.length).fill(null).map(() => new Array(input[0].length).fill(false))

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (isLowPoint(input, i, j)) {
      basins.push(exploreBasin(input, i, j, input[i][j], visited))
    }
  }
}

const result = basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, el) => acc * el, 1)

console.log(result)
