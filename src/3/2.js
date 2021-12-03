const { readInput } = require("../file");

const registers = readInput()

const oxygen = count('oxygen')
const co2 = count('co2')

const result = toDec(oxygen) * toDec(co2)

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

function count(what) {
  let registersLeft = registers;
  let position = 0;
  while (registersLeft.length > 1) {
    const freq = new Array(registers[0].length).fill(0)

    for (const register of registersLeft) {
      for (let i = 0; i < register.length; i++) {
        freq[i] += +register[i]
      }
    }

    let bit;
    if (what === 'oxygen') {
      bit = +(freq[position] >= registersLeft.length / 2)
    } else {
      bit = +(freq[position] < registersLeft.length / 2)
    }

    registersLeft = registersLeft.filter(reg => +reg[position] === bit)
    position++
  }
  return registersLeft[0]
}
