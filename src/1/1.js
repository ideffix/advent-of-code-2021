const { readInput } = require("../file");

const nums = readInput().map(Number)

let result = 0;

for (let i = 1; i < nums.length; i++) {
  if (nums[i] > nums[i-1]) result++
}

console.log(result)
