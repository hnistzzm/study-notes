

let person = {
    name:'张三',
    friends:{
        name:'张三1'
    }
}


let proxy = new Proxy(Name,{
    get(target,propKey,proxy){
        console.log("get",target,propKey,proxy);
        return target[propKey];
    },
    set(target,propKey,propValue,receiver){
        console.log("set",target,propKey,propValue,receiver);
        target[propKey] = propValue;

        return true;
    },
    // apply(target,thisArg,args){
    //     console.log("apply",target,thisArg,args);
    //     return '我是李四'
    // }

})

// proxy.name = '王五'
// console.log(proxy()); 
// console.log(proxy.call(person));

console.log(proxy.friends.name);
// console.log(person.name);