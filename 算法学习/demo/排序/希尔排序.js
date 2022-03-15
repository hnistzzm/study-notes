
function shellSort(arr,gap){
    for(let i=0;i<gap.length;i++){
        let n = gap[i];
        for(let j=i+n;j<arr.length;j++){
            for(let k=j;k>0;k-=n){
                if(arr[k]<arr[k-n]){
                    [arr[k],arr[k-n]] = [arr[k-n],arr[k]];
                }else{
                    break;
                }
            }
        }
    }
    return arr;
}
console.log(shellSort([1,6,3,4,7,5,2,1,0,8,5,6,4],[3,2,1]));