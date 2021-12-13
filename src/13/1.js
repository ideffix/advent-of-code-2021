const { readInput } = require("../file");
const [coords, folds] = parseInput(readInput())

function parseInput(input) {
  let lineIdx = 0;
  const coords = [];
  while (input[lineIdx].length > 0) {
    coords.push(input[lineIdx].split(',').map(Number))
    lineIdx++
  }
  lineIdx++
  const folds = [];

  for (let i = lineIdx; i < input.length; i++) {
    const split = input[i].split('=');
    if (split[0].includes('x')) {
      folds.push([+split[1], undefined])
    } else {
      folds.push([undefined, +split[1]])
    }
  }
  return [coords, folds]
}

function createPaper(coords) {
  const maxX = Math.max(...coords.map(el => el[0]))
  const maxY = Math.max(...coords.map(el => el[1]))

  const paper = new Array(maxY+1).fill(null).map(() => new Array(maxX+1).fill('.'))
  coords.forEach(([x,y]) => paper[y][x] = '#')
  return paper
}

function fold(paper, fold) {
  if (fold[0]) {
    return foldRight(paper, fold[0])
  } else {
    return foldUp(paper, fold[1])
  }
}

function foldUp(paper, y) {
  const result = paper.slice(0, y);
  let topIdx = y-1;
  let botIdx = y+1
  let lineLength = paper[0].length

  while (topIdx >= 0 && botIdx < paper.length) {
    for (let i = 0; i < lineLength; i++) {
      if (paper[botIdx][i] === '#') {
        result[topIdx][i] = '#'
      }
    }
    topIdx--;
    botIdx++;
  }
  return result;
}

function foldRight(paper, x) {
  const result = [];

  for (const line of paper) {
    let leftIdx = x-1;
    let rightIdx = x+1;
    const newLine = line.slice(0, x);
    while (leftIdx >= 0 && rightIdx < line.length) {
      if (line[rightIdx] === '#') {
        newLine[leftIdx] = '#'
      }
      leftIdx--;
      rightIdx++;
    }
    result.push(newLine)
  }
  return result
}

function dotsVisible(paper) {
  return paper.reduce((acc, line) => acc + line.reduce((acc2, char) => acc2 + (char === '#' ? 1 : 0), 0), 0)
}

const paper = createPaper(coords)

const folded = fold(paper, folds[0])

const result = dotsVisible(folded)

console.log(result)
