const { readInput } = require("../file");
const nums = readInput()[0].split(',').map(Number)

let minPosition = 0;
let minFuel = Infinity;

for (let i = 0; i < nums.length; i++) {
  let sum = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += Math.abs(nums[i] - nums[j])
  }
  if (sum < minFuel) {
    minFuel = sum;
    minPosition = i
  }
}

console.log(minFuel)
