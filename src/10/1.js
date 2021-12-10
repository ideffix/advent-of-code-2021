const { readInput } = require("../file");
const input = readInput()

function invalidClosingTag(line) {
  const openedStack = [];
  for (let i = 0; i < line.length; i++) {
    const tag = line[i];
    if (OPEN_TAGS.includes(tag)) {
      openedStack.push(tag);
    } else {
      const lastOpenTag = openedStack.pop();
      if (PAIRS[lastOpenTag] !== tag) {
        return tag
      }
    }
  }
}

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
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
  const closingTag = invalidClosingTag(line)
  if (closingTag) {
    invalid.push(closingTag)
  }
}

const countMap = {};

for (const tag of invalid) {
  if (tag in countMap) {
    countMap[tag]++
  } else {
    countMap[tag] = 1
  }
}

const result = Object.entries(countMap).reduce((acc, [tag, count]) => acc + count * POINTS[tag], 0)

console.log(result)
