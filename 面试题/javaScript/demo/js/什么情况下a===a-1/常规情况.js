



const a = 1/0
console.log(a === a-1); //true

const b1 = Infinity
const b2 = -Infinity
console.log( b1 === b1 - 1); //true
console.log( b2 === b2 -1); //true

const c1 = Number.MAX_VALUE
const c2 = Number.MAX_SAFE_INTEGER
const c3 = Number.MIN_VALUE
const c4 = Number.MIN_SAFE_INTEGER

console.log(c1 === c1-1); //true
console.log(c2 === c2+1); //false
console.log(c3 === c3-1); //false
console.log(c4 === c4-1); //false

const d = NaN
console.log( d === d-1); // false NaN与任何数都不相等(包括他本身)