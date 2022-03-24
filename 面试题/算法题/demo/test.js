var cuttingRope = function(n) {
    if(n<=3) return n-1;
    let a = parseInt(n / 3) ;
    let rem = n % 3;
    if(rem === 0){
        return 3 ** a;
    }else if (rem === 1){
        return 2 * 2 * (3 ** (a-1));
    }else{
        return 2 * (3 ** a);
    }
};
console.log(cuttingRope(10)); 