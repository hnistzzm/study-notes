/**
 * every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
 * arr.every(callback(element[, index[, array]])[, thisArg])
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
 * 返回值:如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
 */

const data =  require("./data.js")
Array.prototype.cs_every = function(callback,_this = this){
    
    const that = _this
    let flag = true

    for (let i = 0; i < that.length; i++) {
        
        flag = callback(that[i],i,that) 

        if(!flag){
            return flag
        }
        
    }
    return flag
}

console.log(data.cs_every( item => item.num >= 0)); 