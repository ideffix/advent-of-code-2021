const { readInput } = require("../file");
const input = readInput()

function parseInput(input) {
  return input.map(line => {
    const [from, to] = line.split(' -> ');
    const [x1, y1] = from.split(',').map(Number)
    const [x2, y2] = to.split(',').map(Number)
    return [x1, y1, x2, y2]
  })
}

function minMax(input) {
  let minX = Math.min(input[0][0],input[0][2])
  let minY = Math.min(input[0][1],input[0][3])
  let maxX = Math.max(input[0][0],input[0][2])
  let maxY = Math.max(input[0][1],input[0][3])
  input.forEach(([x1, y1, x2, y2]) => {
    minX = Math.min(minX, x1, x2)
    maxX = Math.max(maxX, x1, x2)
    minY = Math.min(minY, y1, y2)
    maxY = Math.max(maxY, y1, y2)
  })
  return [minX, minY, maxX, maxY]
}

const parsedInput = parseInput(input)
const [minX, minY, maxX, maxY] = minMax(parsedInput)

const occurrences = new Array(maxY-minY+1).fill(null).map(() => new Array(maxX-minX+1).fill(0))

for (const [x1, y1, x2, y2] of parsedInput) {
  const startX = Math.min(x1, x2);
  const stopX = Math.max(x1, x2);
  const startY = Math.min(y1, y2);
  const stopY = Math.max(y1, y2);

  //diag
  if ((stopX - startX) === (stopY - startY)) {
    const times = stopX - startX +1;
    const dirX = x1 < x2 ? 1 : -1
    const dirY = y1 < y2 ? 1 : -1
    let x = x1-minX;
    let y = y1-minY;
    for (let i = 0; i < times; i++) {
      occurrences[y][x]++;
      x += dirX;
      y += dirY;
    }
  } else {
    //x
    if (y1 === y2) {
      for (let i = startX; i <= stopX; i++) {
        const x = i-minX
        const y = y1-minY
        occurrences[y][x]++
      }
    }
    //y
    if (x1 === x2) {
      for (let i = startY; i <= stopY; i++) {
        const x = x1-minX;
        const y = i-minY;
        occurrences[y][x]++
      }
    }
  }

}

const result = occurrences.flat().filter(num => num >= 2).length

console.log(result)
