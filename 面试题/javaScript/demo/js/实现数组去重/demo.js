
const arr = [1,1,2,2,3,3]

//第一种 reduce迭代器去重
const arr1 = arr.reduce((pre,next) => {

    if(!pre.includes(next)) pre.push(next)
    return pre

},[])
console.log(arr1);

//第一种 Set去重
const arr2 = [...new Set(arr)]
console.log(arr2);