/**
 * flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 * var newArray = arr.flat([depth])
 * depth 可选
    指定要提取嵌套数组的结构深度，默认值为 1。
 * 返回值:一个包含将数组与子数组中所有元素的新数组。
 */
Array.prototype.cs_flat = function( length = 1){
   
    let arr = this
    let i = 0

    while(arr.some(item => Array.isArray(item))){
        
        arr = [].concat(...arr)
        console.log("arr",arr);
        console.log("...arr",...arr);
        i++
        if(i >= length) break
    }
    return arr
}

const arr = [1,2,[3,4,[5,6]],7,8]
console.log(arr.cs_flat(2));