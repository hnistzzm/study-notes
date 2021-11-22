var onmessage = function(event){
    var number = event.data 
    console.log("分线程接收到主线程发送的数据",number);
    var result = fn(number)
    postMessage(result)
    
} 
function fn(n){
    if(n>=2){
     return fn(n-1)+fn(n-2)   
    }else if(n==1){
        return 1
    }else if(n==0){
        return 0
    }
    
}