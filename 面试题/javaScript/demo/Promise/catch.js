
const promise = new Promise((resolve, reject) => {
    resolve('ok');
})

promise
    .then((data) => {
        console.log(data);
        // console.log(a);
        return 'ok2'
    })
    .then((data) =>{
        console.log(data);
    })
    .then((data) =>{
        console.log("1");
    })
    .catch((err) => {
        console.log(err);
    })