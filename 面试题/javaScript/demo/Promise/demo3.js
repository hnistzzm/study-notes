

 function fun(){

    console.log(1);
    return new Promise(function(resolve,reject) {
        console.log(5);
        resolve(2);
    }).then(res=>{console.log(res)})

}

async function fun1(){


    await fun();
    console.log(3);


    // return new Error('123')
}
fun1().then(res=>{console.log('res',res)});
console.log(4);