const { readInput } = require("../file");

const registers = readInput()

const freq = new Array(registers[0].length).fill(0)
const gammaArr = new Array(registers[0].length).fill(0)
const epsilonArr = new Array(registers[0].length).fill(0)

for (const register of registers) {
  for (let i = 0; i < register.length; i++) {
    freq[i] += +register[i]
  }
}

for (let i = 0; i < freq.length; i++) {
  if (freq[i] > (registers.length / 2)) {
    gammaArr[i] = 1
  } else {
    epsilonArr[i] = 1
  }
}

const result = toDec(gammaArr) * toDec(epsilonArr)


console.log(result)

function toDec(numArr) {
  let result = 0;
  let exp = 0;
  for (let i = numArr.length - 1; i >= 0; i--) {
    result += numArr[i] * Math.pow(2, exp)
    exp++;
  }
  return result;
}
