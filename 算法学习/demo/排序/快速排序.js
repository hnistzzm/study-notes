

function quickSort(arr){

    if(arr.length <= 1){//递归出口
        return arr;
    }
    let left = [];
    let right = [];
    let basic = arr.shift();

    for(let i = 0;i < arr.length;i++){
        if(arr[i]<basic){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(basic,quickSort(right))

}
const arr = [1,4,2,-2,6,8,5,1,6,45,4]
console.log(quickSort(arr)); 