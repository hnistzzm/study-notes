/**
 * 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
 */
let str = 'yunsheng';

let iterator = str[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());