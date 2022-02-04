/**
 * map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * var new_array = arr.map(function callback(currentValue[, index[, array]]) {
        // Return element for new_array 
    }[, thisArg])
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
    
 * 返回值:一个由原数组每个元素执行回调函数的结果组成的新数组。
 */

const data =  require("./data.js")
Array.prototype.cs_map = function(callback,_this = this){
    const that = _this
    const res = []
    for (let i = 0; i < that.length; i++) {
        res.push(callback(that[i],i,that))
    }
    return res
}

console.log(data.cs_map((item,index) => `${item.name}--${item.num}--${index}`));