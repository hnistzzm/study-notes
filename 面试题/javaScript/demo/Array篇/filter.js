/**
 * filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 * var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
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
 * 返回值:一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
 */

const data =  require("./data.js")
Array.prototype.cs_filter = function(callback,_this = this){

    const that = _this
    const res = []
    for (let i = 0; i < that.length; i++) {
        callback(that[i],i,that) && res.push(that[i])
    }

    return res
}

console.log(data.cs_filter ( item => item.num > 20) ); 