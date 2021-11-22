
// function Person(){
//     this.name = "孙行者"
// }
// let per = new Person()
// Person.prototype.a = 1
// console.log(per.name);
// console.log(per.__proto__.a);
// console.log(Person.prototype === per.__proto__);

function Person(){
    this.name = "孙悟空"
}
let per = new Person()
console.log( per.hasOwnProperty('name'));//true
console.log(per.hasOwnProperty('hasOwnProperty'));//false
console.log(per.__proto__.hasOwnProperty('hasOwnProperty'));//false
console.log(per.__proto__.__proto__.hasOwnProperty('hasOwnProperty'));//true
console.log(per.__proto__.__proto__.__proto__);//null