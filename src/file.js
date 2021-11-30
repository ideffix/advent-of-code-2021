const fs = require('fs');

function readInput(filename = 'input.txt') {
  const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);
  lines.pop()
  return lines
}

module.exports = {
  readInput
}
