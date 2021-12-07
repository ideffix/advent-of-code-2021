const { readInput } = require("../file");
const nums = readInput()[0].split(',').map(Number)

let minPosition = 0;
let minFuel = Infinity;
const maxNum = Math.max(...nums)

for (let i = 0; i <= maxNum; i++) {
  let sum = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += sumAllNums(Math.abs(i - nums[j]))
  }
  if (sum < minFuel) {
    minFuel = sum;
    minPosition = i
  }
}

console.log(minFuel)


function sumAllNums(num) {
  let res = 0;
  for (let i = 1; i <= num; i++) {
    res += i;
  }
  return res;
}
