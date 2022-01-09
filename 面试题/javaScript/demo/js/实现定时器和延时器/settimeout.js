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

function test2() {
    console.log("延时完成");
}
timeout(test,1000)

