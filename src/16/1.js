const { readInput } = require("../file");

const hex = readInput()[0]

const HEX_DICT = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
}

const binary = hex2bin(hex)

function hex2bin(hex){
  return [...hex].map(char => HEX_DICT[char]).join('')
}

function bin2Dec(bin) {
  return parseInt(bin, 2);
}

const PACKAGE_TYPE_ID = {
  LITERAL: 4
}

function parsePackage(binary) {
  if ([...binary].every(char => char === '0')) return {bitsRead: Infinity, subPackages: [], version: 0};

  const version = bin2Dec(binary.slice(0, 3))
  const packageTypeId = bin2Dec(binary.slice(3, 6))
  if (packageTypeId === PACKAGE_TYPE_ID.LITERAL) {
    let literalIdx = 6;
    let literal = '';
    while (binary[literalIdx] === '1') {
      literal += binary.slice(literalIdx+1, literalIdx+5)
      literalIdx += 5;
    }
    literal += binary.slice(literalIdx+1, literalIdx+5)
    const value = bin2Dec(literal)

    return {version, packageTypeId, value, bitsRead: literalIdx+5, subPackages: []}
  } else {
    const lengthTypeId = binary[6];
    const subPackages = [];
    let bitsRead = 0;
    if (lengthTypeId === '0') {
      const totalLength = bin2Dec(binary.slice(7, 7+15));
      while (bitsRead < totalLength) {
        const parsedPackage = parsePackage(binary.slice(7+15 + bitsRead))
        subPackages.push(parsedPackage)
        bitsRead += parsedPackage.bitsRead
      }
      bitsRead += 7+15
    } else {
      const numberOfSubpackages = bin2Dec(binary.slice(7, 7+11));
      while (subPackages.length < numberOfSubpackages) {
        const parsedPackage = parsePackage(binary.slice(7+11 + bitsRead))
        subPackages.push(parsedPackage)
        bitsRead += parsedPackage.bitsRead
      }
      bitsRead += 7+11
    }
    return {version, packageTypeId, bitsRead, subPackages}
  }
}

const MATH_DICT = {
  0: (packages) => packages.reduce((acc, el) => acc + math(el), 0),
  1: (packages) => packages.reduce((acc, el) => acc * math(el), 1),
  2: (packages) => Math.min(...packages.map(math)),
  3: (packages) => Math.max(...packages.map(math)),
  5: (packages) => +(math(packages[0]) > math(packages[1])),
  6: (packages) => +(math(packages[0]) < math(packages[1])),
  7: (packages) => +(math(packages[0]) === math(packages[1])),
}

function math(package) {
  if (package.packageTypeId === 4) {
    return package.value;
  } else {
    return MATH_DICT[package.packageTypeId](package.subPackages)
  }
}

const packages = parsePackage(binary)

const result = math(packages)

console.log(result)
