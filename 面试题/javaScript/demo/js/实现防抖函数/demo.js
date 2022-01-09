
// function debounce (fun,delay){

//     let timer
//     return function(){
//         if(timer){
//             clearTimeout(timer)
//         }
//         const  args = arguments

//         timer = setTimeout(()=>{
//             fun.apply(this,args)
//         },delay)
//     }

// }

// function fn(a,b) {
//     console.log("a",a);
//     console.log("b",b);
// }
// let deb = debounce(fn,2000)
// setInterval(() => {
//     deb(1,2)
// }, 1000);

function test(){
    console.log("延时完成");
}

function test2() {
    console.log("执行延时器");
}

//延时器
function timeout(fun,delay){

    let date = new Date().getTime()


    while(1){
        while(new Date().getTime() - date >= delay){
            fun()
            return
        }
    }
 

}
// 定时器
function timeInterval(fun,delay) {
    
    let date = new Date().getTime()
    while(1){
        while(new Date().getTime() - date >= delay){
            fun()
            date = new Date().getTime()
        }
    }

}

// timeout(test,1000)
timeInterval(test2,1000)