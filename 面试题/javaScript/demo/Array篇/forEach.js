/**
 * forEach() 方法对数组的每个元素执行一次给定的函数。
 * arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
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
 */
const data =  require("./data.js")
const data1 = [
    {name:'张',num:24}
]
Array.prototype.cs_forEach = function(callback,_this = this){
    const that = _this
    for (let i = 0; i < that.length; i++) {

        callback(that[i],i,that)
    }
}

data.cs_forEach((item,index)=>{
    console.log(`${item.name}--${item.num}--${index}`);
})

