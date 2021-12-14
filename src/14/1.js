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

function processStep(template, rules) {
  let newTemplate = template[0]

  for (let i = 0; i < template.length-1; i++) {
    const key = template.slice(i, i+2);
    if (rules.has(key)) {
      const inBetween = rules.get(key);
      newTemplate += inBetween + template[i+1]
    } else {
      newTemplate += template[i+1]
    }
  }

  return newTemplate
}

function quantity(str) {
  const map = new Map();

  for (const char of str) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1)
    } else {
      map.set(char, 1)
    }
  }

  const values = [...map.values()]
  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min, max];
}

const STEPS = 10;

let current = template;
for (let i = 0; i < STEPS; i++) {
  current = processStep(current, rules)
}

const [min, max] = quantity(current)
const result = max - min;
console.log(result)
