

let fn = Symbol('fn')

console.log(fn);
let obj = {
    fn:function(){
        console.log("a-b");
    }
};

obj[fn] = function (a,b) {
    console.log("a+b");
}

obj.fn();
obj[fn]()
obj['fn']()