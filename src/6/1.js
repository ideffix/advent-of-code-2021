const { readInput } = require("../file");
const fishes = readInput()[0].split(',').map(Number)

let days = 0;
const totalDays = 18

while (days++ < totalDays) {
  const babies = [];
  for (let i = 0; i < fishes.length; i++) {
    if (--fishes[i] < 0) {
      babies.push(8)
      fishes[i] = 6
    }
  }
  fishes.push(...babies)
}

console.log(fishes.length)

