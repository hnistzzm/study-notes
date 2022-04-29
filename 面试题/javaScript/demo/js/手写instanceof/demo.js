
/**
 * 遍历child的隐式原型链,如果隐式原型链上存在father的显式原型,则返回true,否则为false
 * @param {*} father 
 * @param {*} child 
 */
function instance(father,child){
    const fp =  father.prototype   
    let cp = child.__proto__
    while(cp){
        if(cp === fp) return true
        cp = cp.__proto__
    }
    return false
}

// function instance1(father,child){

//     let fp = father.prototype;
//     let cp = child.__proto__;

//     while(cp){

//         if(cp === fp) return true
//         cp = cp.__proto__;
//     }
//     return false;

// }

let obj = {}
let fun = function(){

}
console.log(instance(Function,Object)); //true

console.log(instance(Object,Function)); //true
