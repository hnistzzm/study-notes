"use strict";
const test = Symbol();
let obj = {
    [test]: '123'
};
console.log(obj[test]);
