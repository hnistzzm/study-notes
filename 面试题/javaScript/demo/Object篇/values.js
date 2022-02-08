/**
 * 将对象的所有值转成数组合集
 */

Object.prototype.cs_values = function(obj){

    const res = []
    
    for (const k in obj) {
       
        obj.hasOwnProperty(k) && res.push(obj[k])
    }
    return res
}

const data = require('./data')

console.log(Object.cs_values(data));