
const num = 12.76
const integer = parseInt(num.toString().split('.')[0])
const decimal = parseInt(num.toString().split('.')[1])
console.log(`${integer}.${decimal}`);