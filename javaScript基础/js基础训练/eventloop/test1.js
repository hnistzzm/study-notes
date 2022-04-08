
function fn() {
    setTimeout(()=>{
        console.log(123);
    },2000)
    return 'ok'
}
console.log(fn());