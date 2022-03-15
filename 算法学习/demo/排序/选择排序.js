
function selectSort(arr){

    for (let i = 0; i < arr.length-1; i++) {
        
        for(let j = i;j<arr.length;j++){
            if(arr[j] < arr[i]){
                [arr[j],arr[i]] = [arr[i],arr[j]];
            }
        }
    }
    return arr;
}
let arr = [1,5,7,2,6,4,3]
console.log(selectSort(arr)); 