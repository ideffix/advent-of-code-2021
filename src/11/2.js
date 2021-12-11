const { readInput } = require("../file");
let board = readInput().map(str => [...str].map(Number))

let flashesCount = 0;

let allFlashed = false
let step = 0;

while (!allFlashed) {
  incrementBoard(board)

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      flashesCount += countFlashes(board, i, j)
    }
  }

  let sum = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if(board[i][j] === -Infinity) {
        board[i][j] = 0;
      }
      sum += board[i][j]
    }
  }

  allFlashed = sum === 0

  step++;
}

console.log(step)

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


