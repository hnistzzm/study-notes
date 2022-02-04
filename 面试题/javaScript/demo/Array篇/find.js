/**
 * find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 * arr.find(callback[, thisArg])
 * callback
    为数组中每个元素执行的函数，该函数接收一至三个参数：
    currentValue
        数组中正在处理的当前元素。
    index 可选
     数组中正在处理的当前元素的索引。
    array 可选
        forEach() 方法正在操作的数组。
 * thisArg 可选
    可选参数。当执行回调函数 callback 时，用作 this 的值。
 * 返回值:数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。
 */
const data = require('./data')
Array.prototype.cs_find = function(callback,_this = this){

    const that = _this
    
    for (let i = 0; i < that.length; i++) {
        
        if(callback(that[i],i,that)){
            return that[i]
        }
        
    }
    return undefined
}

console.log(data.cs_find( item => item.name === '詹姆斯')); 