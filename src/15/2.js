const { readInput } = require("../file");

const matrix = readInput().map(line => [...line].map(Number))
const bigMatrix = makeItBigBoi(matrix)

function print(matrix) {
  for (const line of matrix) {
    console.log(line.join(''))
  }
}

function makeItBigBoi(matrix) {
  const big = new Array(matrix.length * 5).fill(null).map(() => new Array(matrix[0].length * 5))

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
          const iIdx = i + x * matrix.length;
          const jIdx = j + y * matrix[0].length;
          let newVal = matrix[i][j] + x + y;
          if (newVal >= 10) {
            newVal = newVal % 10 + 1
          }
          big[iIdx][jIdx] = newVal
        }
      }
    }
  }

  return big
}

function aStar(start, goal, matrix, h) {
  const openSet = new Set();
  openSet.add(start.toString())
  const gScore = new Array(matrix.length).fill(null).map(() => new Array(matrix[0].length).fill(Infinity))
  const fScore = new Array(matrix.length).fill(null).map(() => new Array(matrix[0].length).fill(Infinity))
  gScore[start[0]][start[1]] = 0
  fScore[start[0]][start[1]] = h(start, goal)
  while (openSet.length !== 0) {
    const current = popMin(openSet, fScore)
    if (current.toString() === goal.toString()) {
      return gScore;
    }
    const neightbors = getNeightbors(matrix, current[0], current[1]);
    for (const neighbor of neightbors) {
      const tentative_gScore = gScore[current[0]][current[1]] + matrix[neighbor[0]][neighbor[1]]
      if (tentative_gScore < gScore[neighbor[0]][neighbor[1]]) {
        gScore[neighbor[0]][neighbor[1]] = tentative_gScore
        fScore[neighbor[0]][neighbor[1]] = tentative_gScore + h(neighbor, goal)
        if (!openSet.has(neighbor.toString())) {
          openSet.add(neighbor.toString())
        }
      }
    }
  }

}

function popMin(openSet, fScore) {
  let currentMin = Infinity;
  let currentMinEl = undefined;

  for (const strCoords of openSet) {
    const [i, j] = getCoords(strCoords);
    if (currentMin > fScore[i][j]) {
      currentMin = fScore[i][j]
      currentMinEl = strCoords;
    }
  }

  openSet.delete(currentMinEl)
  return getCoords(currentMinEl)
}

function getCoords(strCoords) {
  return strCoords
    .split(',')
    .map(Number)
}

function getNeightbors(matrix, i, j) {
  const result = [
    getNeightbor(matrix, i+1, j),
    getNeightbor(matrix, i-1, j),
    getNeightbor(matrix, i, j+1),
    getNeightbor(matrix, i, j-1)
  ];

  return result.filter(Boolean);
}

function getNeightbor(matrix, i, j) {
  if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[i].length) return undefined;
  return [i, j]
}

const h = (p1, p2) => Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))

const weights = aStar([0, 0], [bigMatrix.length-1, bigMatrix.length-1], bigMatrix, h);

const result = weights[weights.length-1][weights.length-1]

console.log(result)

