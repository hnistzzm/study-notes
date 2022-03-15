
function insertSort(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
         if(arr[j] < arr[j-1]){
            [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
         }else{
             break;
         }
        }
    }
    return arr ;
}
let arr = [1,5,5,4,2,3,8,5,0,-10];
console.log( insertSort(arr));