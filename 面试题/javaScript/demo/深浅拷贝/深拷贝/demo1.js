
//实现深拷贝
function  deepClone(source) {

    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            
            if(source[key] && typeof source[key] === 'object'){//如果值是对象就递归
                targetObj[key] = source[key].constructor === 'Array' ? [] : {};
                deepClone(targetObj[key]);
            }else{//如果不是就直接赋值
                targetObj[key] = source[key];
            }
            
        }
    }
    return targetObj;
}

const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};
const cloneObj = deepClone(originObj);
console.log(cloneObj === originObj); // false

cloneObj.a = 'aa';
cloneObj.c = [1,1,1];
cloneObj.d.dd = 'doubled';

console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'}};
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};

const originObj2 = {
    name:'张振明',
    sayHello:function(){
      console.log('Hello World');
    }
  }
  console.log(originObj2); // {name: "张振明", sayHello: ƒ}
  const cloneObj2 = deepClone(originObj2);
  console.log(cloneObj2); // {name: "张振明", sayHello: ƒ}