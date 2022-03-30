function quickSort(arr){
    if(arr.length <= 1) return arr;

    let left = [];
    let right = [];
    let basic = arr.shift();

    for(let i=0;i<arr.length;i++){

       if(arr[i]<basic) left.push(arr[i]);
       if(arr[i]>=basic) right.push(arr[i]);

    }

    return quickSort(left).concat(basic,quickSort(right));

}
let nums1 = [1,5,4,2,6,8,3,55]
console.log( quickSort(nums1));