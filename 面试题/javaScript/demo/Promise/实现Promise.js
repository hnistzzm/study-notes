
//p2指的是上一次返回的promise，x表示运行promise返回的结果，resolve和reject是p2的方法
function resolvePromise(promise2,x,resolve,reject) {

    //规范中规定: Promise的返回结果不能是自己
    //当返回结果是自己时，永远也不会成功或失败，因此当返回自己时，应抛出一个错误
    if(promise2 === x){
        return reject( new TypeError("循环引用"));
    }

    if(x !== null && (typeof x === 'object' || typeof x === 'function')){

        let called = false;
        try {
            let then = x.then;//获取x的then方法
            if(typeof then === 'function'){//如果then是函数就认定他是promise

                then.call(x,y => {//如果Y是promise就继续递归promise
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject);

                },r => { //只要失败了就失败
                    if(called) return;
                    called = true;
                    reject(r);
                })
            }else{//then是一个普通对象,直接成功
                resolve(x);
            }
        } catch (e) {
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        resolve(x);
    }
}


class Promise {

    constructor(executor){

        //默认状态是等待状态
        this.status = "pending";
        this.value = undefined; //promise 执行成功时的响应
        this.reason = undefined; //promise 执行失败时的响应

        //存放成功的回调
        this.onResolvedCallbacks = [];
        //存放失败的回调
        this.onRejectedCallbacks = [];

        let resolve = (data) => { //this指向是实例
            if(this.status === 'pending'){//如果状态为pending,修改状态,响应并执行成功的回调
                this.value = data;
                this.status = 'resolved';
                this.onResolvedCallbacks.forEach( fn => fn());
            }
        }

        let reject = (reason) => { //this指向是实例
            if(this.status === 'pending'){//如果状态为pending,修改状态,响应并执行失败的回调
                this.value = reason;
                this.status = 'rejected';
                this.onRejectedCallbacks.forEach( fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {//then方法

        //防止值穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};


        if(this.status === 'resolved'){
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);

                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error);
                    }
                },0)
            });
            
        }
        if(this.status === 'rejected'){
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);

                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error);
                    }
                },0)
            })
           
        }
        //当前处于'pending'状态,既没有完成,也没有失败
        if(this.status === 'pending'){

            promise2 = new Promise(function(resolve, reject) {
                 //存放成功的回调
                this.onResolvedCallbacks.push( () => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
    
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error);
                        }
                    },0)
                })

                 //存放失败的回调
                this.onRejectedCallbacks.push( () => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
    
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error);
                        }
                    },0)
                })
            })
           

           
        }
        return promise2;
    }

    catch(onRejected) {
        //catch 方法就是then方法没有成功的简写
        return this.then(null,onRejected);
    }
}