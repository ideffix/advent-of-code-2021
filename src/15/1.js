const { readInput } = require("../file");

const matrix = readInput().map(line => [...line].map(Number))

function dijkstrasAlgorithm(start, edges) {
  const visited = new Set();
  const weights = new Array(edges.length).fill(null).map(() => new Array(edges[0].length).fill(Infinity));
  weights[start[0]][start[1]] = 0;
  const allVertices = edges.length * edges[0].length

  while(visited.size !== allVertices) {
    const [[i, j], currentMin] = getMinVertex(weights, visited)
    const neightbors = getNeightbors(edges, i, j)

    if (currentMin === Infinity) break;

    visited.add([i,j].toString())

    for (const [x,y] of neightbors) {
      const weight = edges[x][y]
      if (visited.has([x,y].toString())) continue;
      weights[x][y] = Math.min(weights[x][y], weights[i][j] + weight)
    }

  }

  return weights
}

function getMinVertex(weights, visited) {
  let minIdxI = -1;
  let minIdxJ = -1;
  let currentMin = Infinity;

  for (let i = 0; i < weights.length; i++) {
    for (let j = 0; j < weights[i].length; j++) {
      if (visited.has([i,j].toString())) continue;

      if (currentMin > weights[i][j]) {
        minIdxI = i
        minIdxJ = j
        currentMin = weights[i][j]
      }
    }
  }

  return [[minIdxI, minIdxJ], currentMin]
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

const weights = dijkstrasAlgorithm([0, 0], matrix);
const result = weights[weights.length-1][weights[0].length-1]

console.log(result)
