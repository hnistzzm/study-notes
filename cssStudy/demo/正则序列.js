
function getNum(arr){

    arr.sort((a,b) => a-b);
    let step = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i] !== i+1){
            step += Math.abs(arr[i] - (i+1));
            // console.log("需要补的步骤",arr[i] - (i+1));
            arr[i] = i+1;
        }
    }

    return step;

}

console.log(getNum([-1,2,3,10,100]));