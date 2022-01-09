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


function test2() {
    console.log("执行延时器2");
}

function test1() {
    console.log("执行延时器1");
}
timeInterval(test2,1000)

