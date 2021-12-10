const { readInput } = require("../file");
const input = readInput()

function notClosedTags(line) {
  const openedStack = [];
  for (let i = 0; i < line.length; i++) {
    const tag = line[i];
    if (OPEN_TAGS.includes(tag)) {
      openedStack.push(tag);
    } else {
      const lastOpenTag = openedStack.pop();
      if (PAIRS[lastOpenTag] !== tag) {
        return undefined
      }
    }
  }
  return openedStack
}

const POINTS = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}

const PAIRS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const OPEN_TAGS = Object.keys(PAIRS)

const invalid = [];

for (const line of input) {
  const notClosed = notClosedTags(line)
  if (notClosed) {
    invalid.push(notClosed)
  }
}

const scores = [];

for (const tags of invalid) {
  scores.push(tags.reverse().reduce((acc, el) => acc * 5 + POINTS[el], 0))
}

scores.sort((a,b) => a-b)

console.log(scores[Math.floor(scores.length/2)])
