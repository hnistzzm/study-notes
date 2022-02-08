
/**
 * Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
 * obj
    可以返回其可枚举属性的键值对的对象。
 * 返回值:给定对象自身可枚举属性的键值对数组。
 */

const data = require('./data')

Object.prototype.cs_entries = function(obj){
    
    const res = []

    for (const k in obj) {
       /*
        * hasOwnProperty可以用来检测一个对象是否含有特定的属性,不能检测可枚举属性
        * for...in可以迭代一个对象的除Symbol以外的可枚举属性,包括继承的可枚举属性
        * 这里使用hasOwnProperty再验证一次的目的是将obj原型上的属性去除
       */
        obj.hasOwnProperty(k) && res.push( [k, obj[k]] )
    }
    return res
}

console.log(Object.cs_entries(data));