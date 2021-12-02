const { readInput } = require("../file");

const orders = readInput().map(str => {
  const split = str.split(' ')
  return [split[0], +split[1]]
})

let horizontal = 0;
let depth = 0;
let aim = 0

orders.forEach(([command, value]) => {
  switch (command) {
    case 'forward':
      horizontal += value
      depth += aim * value
      break;
    case 'down':
      aim += value
      break;
    case 'up':
      aim -= value
      break;
  }
})

const result = horizontal * depth

console.log(result)
