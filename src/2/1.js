const { readInput } = require("../file");

const orders = readInput().map(str => {
  const split = str.split(' ')
  return [split[0], +split[1]]
})

let horizontal = 0;
let depth = 0;

orders.forEach(([command, value]) => {
  switch (command) {
    case 'forward':
      horizontal += value
      break;
    case 'down':
      depth += value
      break;
    case 'up':
      depth -= value
      break;
  }
})

const result = horizontal * depth

console.log(result)
