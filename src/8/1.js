const { readInput } = require("../file");
const input = parseInput(readInput())

function parseInput(input) {
  const result = [];
  for (let i = 0; i < input.length; i++) {
    const [first, second] = input[i].split(' | ')

    const pattern = first.split(' ');
    const output = second.split(' ')
    result.push({pattern, output})
  }
  return result;
}

const result = input.reduce((acc, el) => acc + el.output.reduce((acc2, str) => {
  if ([2, 3, 4, 7].includes(str.length)) {
    return acc2 + 1
  } else {
    return acc2
  }
}, 0), 0)

console.log(result)
