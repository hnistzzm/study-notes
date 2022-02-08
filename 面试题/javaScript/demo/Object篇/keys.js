/**
 * 将对象的key转成一个数组合集
 */


Object.prototype.cs_keys = function(obj){
    
    const res = []
    for (const k in obj) {
      
        obj.hasOwnProperty(k) && res.push(k)
    }
    return res
}

const data = require('./data')

console.log(Object.cs_keys(data));