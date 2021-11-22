var fun = require('./c.js')
console.log(fun);
console.log("b模块被引用了");
// exports.sayhello = fun
module.exports = fun