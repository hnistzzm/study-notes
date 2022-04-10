
function getNum(m,n){

    let resArr = [];
    for(let i=m;i<=n;i++){

        let num = i;
        let sum = 0;
        console.log("num",num);
        // console.log("********************************");
        while(num > 0){
            console.log((num % 10) ** 3);
            sum += (num % 10) ** 3;
            // console.log('sum',sum);
            num = parseInt(num/10) ;
            console.log("num",num);
        }
        console.log("************************");
        // console.log('sum',sum);
        if(sum === i){
            resArr.push(i);
        }

    }

    return resArr.length ? resArr.join(' ') : 'no'

}
console.log(getNum(300,380));
