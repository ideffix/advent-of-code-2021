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

const LENGTH_NUM_DICT = {
  2: 1,
  3: 7,
  4: 4,
  7: 8
}

const rules = {
  5: {
    3: [{num: 1, common: 2}],
    2: [{num: 4, common: 2}, {num: 1, common: 1}],
    5: [{num: 4, common: 3}]
  },
  6: {
    9: [{num: 4, common: 4}],
    6: [{num: 7, common: 2}],
    0: [{num: 5, common: 4}]
  }
}

function invert(map){
  const inverted = new Map();
  for (let [key, value] of map) {
    inverted.set([...value].sort().join(''), key)
  }
  return inverted
}

function decodeOutput({ pattern, output}) {
  const decodedMap = new Map();
  // find base cases
  for (const str of pattern) {
    if (str.length in LENGTH_NUM_DICT) {
      decodedMap.set(LENGTH_NUM_DICT[str.length], str)
    }
  }

  for (const len of [5, 6]) {
    const filtered = pattern.filter(str => str.length === len);
    const rlz = rules[len]
    for (const str of filtered) {
      const resolvedNumber = resolveNumber(str, rlz, decodedMap)[0]
      decodedMap.set(+resolvedNumber, str)
    }
  }

  const segmentValueMap = invert(decodedMap);

  return +output.map(out => segmentValueMap.get([...out].sort().join(''))).join('')
}

function resolveNumber(str, rules, decodedMap) {
  return Object.entries(rules).find(([num, rule]) => matchesRule(str, rule, decodedMap))
}

function matchesRule(str, rule, decodedMap) {
  return rule.every(r => commonSegmentsCount(str, decodedMap.get(r.num)) === r.common)
}

function commonSegmentsCount(seg1, seg2) {
  const letterCount = {};
  for (const char of seg1) {
    if (char in letterCount) {
      letterCount[char]++
    } else {
      letterCount[char] = 1
    }
  }
  for (const char of seg2) {
    if (char in letterCount) {
      letterCount[char]--
    }
  }
  return Object.values(letterCount).filter(count => count === 0).length
}

const result = input.reduce((acc, el) => acc + decodeOutput(el), 0)

console.log(result)
