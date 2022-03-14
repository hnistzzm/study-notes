
let time1;
let time2;

setTimeout(() => {
    time1 = new Date().getTime();
    console.log("第一个函数执行完毕");
}, 1000);

setTimeout(() => {
    time2 = new Date().getTime();
    console.log("第二个函数执行完毕",time2-time1);
}, 2000);


const timeoutFn = function(timeout){ 

	return new Promise(function(resolve){
        console.log('timeFnPromise');
		return setTimeout(resolve, timeout);
               });
}


async function timeOut() {
    await timeoutFn(1000);
    await timeoutFn(2000);
    console.log("完成");

}
timeOut()