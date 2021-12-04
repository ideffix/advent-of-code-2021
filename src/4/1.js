const { readInput } = require("../file");
const input = readInput()

function parseInput(input) {
  const bingoNums = input[0].split(',').map(Number)

  const boards = [];
  const shots = [];
  const numsMap = new Map();
  const boardsInput = input.slice(1);
  for (let i = 0; i < boardsInput.length; i++) {
    if (boardsInput[i].length === 0) {
      boards.push([])
      shots.push([]);
    } else {
      const inputLine = boardsInput[i].trim().replace(/\s+/g, ' ').split(' ').map(Number);
      const numsLine = [];
      for (let i = 0; i < inputLine.length; i++) {
        const num = inputLine[i]
        numsLine.push(num)
        const newMapItem = [boards.length-1, boards[boards.length-1].length, i];
        if (numsMap.has(num)) {
          numsMap.get(num).push(newMapItem)
        } else {
          numsMap.set(num, [newMapItem])
        }
      }
      boards[boards.length-1].push(numsLine)
      shots[shots.length-1].push(numsLine.map(() => false))
    }
  }

  return [bingoNums, boards, shots, numsMap]
}

const [bingoNums, boards, shots, numsMap] = parseInput(input)

for (const bingoNum of bingoNums) {
  if (numsMap.has(bingoNum)) {
    const numsLocationList = numsMap.get(bingoNum)
    for (const [boardIdx, i, j] of numsLocationList) {
      shots[boardIdx][i][j] = true;
      if (isWin(shots[boardIdx], i, j)) {
        const allUnmarked = getAllUnmarked(boards[boardIdx].flat(), shots[boardIdx].flat()).reduce((acc, el) => acc + el, 0);
        const result = bingoNum * allUnmarked
        console.log(result)
        return;
      }
    }
  }
}

function getAllUnmarked(board, shots) {
  return board.filter((_, i) => !shots[i])
}

function isWin(shots, i, j) {
  return isRowWin(shots, i) || isColWin(shots, j)
}

function isRowWin(shots, row) {
  let isWin = true;

  for (let col = 0; col < shots[row].length; col++) {
    isWin &= shots[row][col]
  }

  return isWin;
}

function isColWin(shots, col) {
  let isWin = true;

  for (let row = 0; row < shots.length; row++) {
    isWin &= shots[row][col]
  }

  return isWin;
}
