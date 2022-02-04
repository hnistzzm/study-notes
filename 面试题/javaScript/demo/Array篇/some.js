/**
 * some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
 * 注意：如果用一个空数组进行测试，在任何情况下它返回的都是false。
 * arr.some(callback(element[, index[, array]])[, thisArg])
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
 * 返回值:数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。                
 */
const data =  require("./data.js")
Array.prototype.cs_some = function(callback,_this = this){

    const that = _this
    let flag = false

    for (let i = 0; i < that.length; i++) {
        
        flag = callback(that[i],i,that)

        if(flag){
            return flag;
        }
    }

    return flag;

    
}

console.log(data.cs_some(item => item.num >20)); 