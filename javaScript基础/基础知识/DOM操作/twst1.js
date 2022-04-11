
function get(n,k,arr){
    // for(let i=0;i<grounp.length;i++){
  
        // let line = read_line().split(' ');
        // let arr = [];
        // let n = line[0];
        // let k = line[1];
        // arr = read_line().split(' ');
        let flag = 1;
        let i=0;
        let good = 1;
        while(i<arr.length-1){
            console.log("i",i);
            console.log(arr[i],arr[i+1]);
            if(arr[i] < arr[i+1]){
            if(good){
                i += k;
                console.log("使用超能力之后的i",i);
                good = 0;
                continue;
            }else{
                console.log('NO');
                flag = 0;
                break;
            }
            }

            i++;


        }
        if(flag === 1){
            console.log('YES');
        }
        
        
        

}
get(5,3,[6,7,4,3,8])

