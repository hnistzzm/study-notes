


var lastRemaining = function(n, m) {

    let res = [];

    let mm = m;
    while(res.length < n){

        if(mm % n == 0) {
            res.push(n-1);
        }else{
            res.push((mm % n)-1);
        }
        
        mm += m;

    }

    return res;
    


};

console.log(lastRemaining(5,3));