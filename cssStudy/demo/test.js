
function getNum(n,m){

    let res = n;
    // let num = Math.sqrt(n,2)
    // console.log(num);
    while(m>1){

        n = Math.sqrt(n,2)
        console.log("n",n);
        res += n;
        m--;
    }

    console.log("res",res.toFixed(2) );
}

getNum(81,4)