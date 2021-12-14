const { readInput } = require("../file");
const [template, rules] = parseInput(readInput())

function parseInput(input) {
  const template = input[0]

  const rules = new Map();
  input.slice(2).forEach(line => {
      const [key, val] = line.split(' -> ')
      rules.set(key, val)
    }
  )

  return [template, rules];
}

function processStep(pairsMap, rules) {
  const pairs = [...pairsMap.keys()]
  const newMap = new Map();

  for (const pair of pairs) {
    const inBetween = rules.get(pair);
    const newPairs = [pair[0] + inBetween, inBetween + pair[1]]
    for (const newPair of newPairs) {
     newMap.set(newPair, (newMap.get(newPair) || 0) + pairsMap.get(pair))
    }
  }
  return newMap
}

function createInitialPairsMap(template) {
  const pairsMap = new Map();

  for (let i = 0; i < template.length-1; i++) {
    const key = template[i] + template[i+1];
    pairsMap.set(key, (pairsMap.get(key) || 0) +1)
  }

  return pairsMap
}

function quantity(pairsMap) {
  const quantityMap = new Map();

  for (const [key, value] of pairsMap) {
    for (const char of key) {
      quantityMap.set(char, (quantityMap.get(char) || 0) + value/2)
    }
  }
  const values = [...quantityMap.values()];

  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min, max];
}

const STEPS = 40;

let pairsMap = createInitialPairsMap(template);
for (let i = 0; i < STEPS; i++) {
  pairsMap = processStep(pairsMap, rules)
}

const [min, max] = quantity(pairsMap)
const result = Math.ceil(max - min)
console.log(result)
