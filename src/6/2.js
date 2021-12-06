const { readInput } = require("../file");
const fishes = readInput()[0].split(',').map(Number)

let days = 0;
const totalDays = 256

const daysFish = new Array(9).fill(0);

for (const fish of fishes) {
  daysFish[fish]++
}

while (days++ < totalDays) {
  const below0 = daysFish.shift()
  daysFish[6] += below0
  daysFish[8] = below0
}

const result = daysFish.reduce((acc, el) => acc + el, 0)

console.log(result)

