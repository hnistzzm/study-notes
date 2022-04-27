




function * fibonacci(){

    let [pre,cur] = [0,1];

    while(1){

        yield cur;

        [pre,cur] = [cur,pre+cur];


    }

}

for (const n of fibonacci()) {
    
    if(n > 1000) return n;
    console.log(n);


}