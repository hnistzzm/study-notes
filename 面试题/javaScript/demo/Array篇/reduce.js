/**
 * reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 * arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
 * callback
    执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
    accumulator
    累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
    currentValue
    数组中正在处理的元素。
    index 可选
    数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
    array可选
    调用reduce()的数组
 * initialValue可选
    作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 * 返回值:函数累计处理的结果
 * 注意：如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。   
  */
const data = require('./data')
Array.prototype.cs_reduce = function(callback,...args){

    let start = 0,pre

    if(args.length){
        pre = args[0]
        start = 1
    }else{
        pre = this[0].num
    }   
    for (let i = start; i < that.length; i++) {
        
        pre = callback(pre,this[i],i,this)
    }
    return pre
}
const sum = data.reduce((pre,next) => {
    return pre + next.num
},0)

console.log(sum);
