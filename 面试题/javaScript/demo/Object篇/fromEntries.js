/**
 * 与entries不同的是 fromEntries将键值对转换成对象
 */

Object.prototype.cs_fromEntries = function(arr){

    const res = {}

    for (let i = 0; i < arr.length; i++) {
        res[arr[i][0]] = arr[i][1]
    }
    return res
}

const data = [['name', '匀生'], ['age', 22], ['gender', '男']]
console.log(Object.cs_fromEntries(data)); 