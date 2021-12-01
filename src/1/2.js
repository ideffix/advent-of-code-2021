const { readInput } = require("../file");

const nums = readInput().map(Number)

let result = 0;

for (let i = 3; i < nums.length; i++) {
  if (nums[i] > nums[i-3]) result++
}

console.log(result)
