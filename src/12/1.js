const { readInput } = require("../file");
const edges = readInput().map(line => line.split('-'))

const edgesMap = createGraph(edges)

const result = traverse(edgesMap.get('start'))

console.log(result)

function createGraph(edges) {
  const edgesMap = new Map();

  for (const [from, to] of edges) {
    const fromVertex = edgesMap.get(from) ?? createVertex(from)
    const toVertex = edgesMap.get(to) ?? createVertex(to)

    fromVertex.edges.push(toVertex)
    toVertex.edges.push(fromVertex)

    edgesMap.set(from, fromVertex)
    edgesMap.set(to, toVertex)
  }

  return edgesMap
}

function createVertex(name) {
  return {
    name,
    edges: [],
    isSmallCave: name[0].toLowerCase() === name[0]
  }
}

function traverse(start) {
  return start.edges.reduce((acc, e) => acc + numberOfPathsToEnd(e, new Set([start])), 0)
}

function numberOfPathsToEnd(vertex, visited) {
  if (vertex.name === 'end') return 1;
  if (vertex.name === 'start' || (vertex.isSmallCave && visited.has(vertex))) return 0;

  return vertex.edges.reduce((acc, e) => acc + numberOfPathsToEnd(e, new Set([...visited, vertex])), 0)
}
