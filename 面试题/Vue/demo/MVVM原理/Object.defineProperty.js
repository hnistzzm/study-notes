
let obj = {};
let song = '简单爱';
obj.singer = '周杰伦';

Object.defineProperty(obj,'music',{
    value: '七里香',//定义变量的值
    configurable: false,// 是否可以配置对象，删除属性
    writable: true,    // 是否可以修改
    enumerable: false, // 是否可以枚举
    // ☆ get,set设置时不能设置writable和value，它们代替了二者且是互斥的
    // get(){
    //     return song;
    // },
    // set(val){
    //     song = val;
    // }
})

console.log(obj);

delete obj.music;
console.log(obj);

obj.music = '听妈妈的话';   // 如果想对obj的属性进行修改，writable要设为true  3
console.log(obj);   // {singer: '周杰伦', music: "听妈妈的话"}

for (let key in obj) {    
    // 默认情况下通过defineProperty定义的属性是不能被枚举(遍历)的
    // 需要设置enumerable为true才可以
    // 不然你是拿不到music这个属性的，你只能拿到singer
    console.log(key);   // singer, music    4
}

console.log(obj.music);   // '听妈妈的话'  5
obj.music = '夜曲';       // 调用set设置新的值
console.log(obj.music);   // '夜曲'    6
