/**
 * includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
 * arr.includes(valueToFind[, fromIndex])
 * valueToFind
    需要查找的元素值。
 * fromIndex 可选
    从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
 *返回值:返回一个布尔值 Boolean 
    */
const data = require('./data')
Array.prototype.cs_includes = function(value,start = 0){

    if (start < 0){
        start = this.length + start
    }
    const isNaN = Number.isNaN(value)
    for (let i = start; i < this.length; i++) {
        if(this[i] === value || (isNaN && Number.isNaN(this[i]))){
            return true
        }
        
    }
    return false
}
console.log([1,2,3].cs_includes(1,1)); //false
console.log([1,2,3].cs_includes(1)); //true
console.log([1,2,3].cs_includes(1,-3)); //true
console.log([1,2,3,NaN].cs_includes(NaN)); //true