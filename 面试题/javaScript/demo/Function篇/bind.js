

// Function.prototype.cs_bind = function(obj,...args){

//     obj = obj || window;

//     const fn = Symbol();
//     obj[fn] = this;

//     const _this = this;

//     const res = function(...innerArgs){

//         if(this instanceof _this){//当作构造函数使用
//             this[fn] = _this;
//             this[fn](...[...args,...innerArgs]);
//             delete this[fn];
//         }else{//没有当作构造函数使用
//             obj[fn](...[...args,...innerArgs])
//             delete obj[fn];
//         }
//     }
//     res.prototype = Object.create(this.prototype);
//     return res;
// }