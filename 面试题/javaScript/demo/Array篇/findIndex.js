/**
 * findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
 * arr.findIndex(callback[, thisArg])
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
 * 返回值:数组中通过提供测试函数的第一个元素的索引。否则，返回-1                
 */
const data = require('./data')

Array.prototype.cs_findIndex = function(callback,_this = this){
    
    const that = _this

    for (let i = 0; i < that.length; i++) {
        
        if(callback(that[i],i,that)){
            return i
        }
        
    }
    return -1
    
}

console.log(data.cs_findIndex( item => item.name === '詹姆斯')); 