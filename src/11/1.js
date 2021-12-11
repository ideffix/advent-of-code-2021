const { readInput } = require("../file");
let board = readInput().map(str => [...str].map(Number))

const STEPS = 100;

let flashesCount = 0;

for (let s = 1; s <= STEPS; s++) {
  incrementBoard(board)

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      flashesCount += countFlashes(board, i, j)
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if(board[i][j] === -Infinity) {
        board[i][j] = 0;
      }
    }
  }
}

console.log(flashesCount)

function incrementBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j]++
    }
  }
}

function countFlashes(board, i, j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[i].length || board[i][j] < 10) return 0;
  board[i][j] = -Infinity;
  let flashesCount = 1;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      increment(board, i + x, j + y)
      flashesCount += countFlashes(board, i + x, j + y)
    }
  }
  return flashesCount;
}

function increment(board, i, j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) return;
  board[i][j]++;
}


