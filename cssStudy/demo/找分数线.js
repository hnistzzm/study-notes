
function getNum(arr,n,m){

    arr.sort((a,b) => a-b);

    if(arr.length === 1){
        return arr[arr.length-1]-1;
    }

    for(let i=arr[0];i<arr[arr.length-1];i++){

        let high = 0;
        let low = 0;

        for(let j=0;j<arr.length;j++){

            if(arr[j] <= i){
                low++;
            }else{
                high++;
            }

        }
        console.log("low",low);
        console.log("hgin",high);
        console.log(low,high);
        if( (low >= n && low <= m) && (high >= n && high <= m)) {//如果晋级和淘汰的人都满足
            return i;
        }   

    }
    return -1;
    
}

console.log(getNum([1],0,1));