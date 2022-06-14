
//一个整型数组 `nums` 里除 **一个** 数字之外，其他数字都出现了两次。

function getNum(arr){

    let res = 0;
    for (const num of arr) {
        
        res ^= num;
    }

    return res;
}

console.log(getNum([0,1,2,1,2]));