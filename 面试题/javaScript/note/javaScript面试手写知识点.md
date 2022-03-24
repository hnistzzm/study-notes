### 1.为什么0.1+0.2不等于0.3?

**解释**:JS中采用的**IEEE 754的双精度标准**，计算机内部存储数据的编码的时候，**0.1在计算机内部根本就不是精确的0.1，而是一个有舍入误差的0.1**。当代码被编译或解释后，0.1已经被四舍五入成一个与之很接近的计算机内部数字，以至于计算还没开始，一个很小的舍入错误就已经产生了。这也就是 0.1 + 0.2 不等于0.3 的原因。

在对两个近似值进行计算时如果得到的值是在近似范围内,就可以得到正确答案

在es6中引入了人Number.EPSILON属性,它表示javaScript的最小精度,它的值接近于2.2204460492453130808472633361816E-16

如果两个数的差值的小于javascript的最小精度,则表明这两个数是相等的,否则这两个数是不相等的

很明显0.1+0.2 与 0.3 的差值是大于这个最小精度的,所以它们是不相等的

```javascript
console.log(0.1+0.2 === 0.3) //false
console.log(0.1 + 0.2)//0.30000000000000004
```

我们可以通过构建一个函数来判断两个数是否满足javascript中的相等的条件

```javascript
function equal(a,b){
    if(Math.abs(a-b) < Number.EPSILON){
        return true
    }else{
        return false
    }
}
console.log(equal(0.1+0.2,0.3))/
```

### 2.在什么情况下a === a-1？

我们可以思考我们所学的数学知识

无穷大和无穷大-1应该怎么比较?按照极限的思想,无穷大与无穷大-1应该是相等的,因为无穷大不能用来表示一个具体的数



在JavaScript中，整数可以被精确表示的范围是 **-2 \** 53 + 1** 到 **2 \** 53 - 1**，即 **-9007199254740991** 到 **9007199254740991**。超过这个数值的整数，都不能被精确表示。

所以当数字超过这个范围时,js会讲这个数定义为无穷大或者无穷小



1. **正负infinity**

   > 在js中,Infinity是一个Number类型的字面量,表示无穷大,当当一个Number类型的值在运算过程中超过了所能表示的最大值,就会得到无穷大



比如，如果我们将一个不为0的正数除以0，得到的结果就是无穷大。

```javascript
console.log(100 / 0); // Infinity 
```

对应的，负数有负无穷大。

```javascript
console.log(-100 / 0); // -Infinity
```

如果我们数值运算的值，超过了Number允许表示的范围，也是会得到Infinity。

```javascript
console.log(1e1000); // Infinity
```



在JavaScript里，**Number.POSITIVE_INFINITY**和**Number.NEGATIVE_INFINITY**两个常量的值，对应正负Infinity。

**Number.isFinite()** 可以判断一个数是否是有穷的，Number.isFinite(n)，当n是Number类型时，只有它是正负Infinity或NaN时，返回false，其他情况下返回true。

任何一个有穷的数和Infinity的加减运算的结果都是Infinity，而**Infinity === Infinity**

所以我们可以知道**±Infinity**都是可以用在a===a-1的情况下的

**但是** **要注意，Infinity运算的结果并不总是Infinity，比如我们看下面几种运算：**

```javascript
console.log(Infinity + Infinity); // Infinity
console.log(Infinity - Infinity); // NaN
console.log(Infinity * Infinity); // Infinity
console.log(Infinity / Infinity); // NaN
console.log(Infinity * 0);        // NaN
```

结论是:

**Infinity运算也有可能得到NaN，所以需要小心，例如我们的一个计算表达式中，有两个值相乘，一个值有可能很大，另一个值有可能为0时，就需要小心，如果那个很大的值得到Infinity，另一个值恰好为0时，整个表达式的值可能是NaN，这会造成一些bug。**

---



**2.任意一个超过JS精度范围的数**

> 👉🏻知识点：  在JavaScript里，整数可以被精确表示的范围是从 2 \* 53 + 1 到 2 \* 53 - 1**，即 **-9007199254740991 到 **9007199254740991**。超过这个数值的整数，都不能被精确表示。
>
> 常量**Number.MAX_SAFE_INTEGER**和**Number.MIN_SAFE_INTEGER**分别对应**9007199254740991**和 **-9007199254740991**。



测试一下

```javascript
let a = 9007199254740986;
for(let i = 0; i < 10; i++) {
    console.log(`${i} : ${a + i}`);
}
```

```javascript
0 : 9007199254740986
1 : 9007199254740987
2 : 9007199254740988
3 : 9007199254740989
4 : 9007199254740990
5 : 9007199254740991
6 : 9007199254740992
7 : 9007199254740992
8 : 9007199254740994
9 : 9007199254740996
```

看到在 a + i 的值小于等于 9007199254740991 时，输出正常的每次循环加1的结果，到了大于 9007199254740991 后，输出的结果里出现了两次 9007199254740992，少了 9007199254740993 和 9007199254740995。

**这是因为**，超过 9007199254740991 之后，JavaScript的Number类型就没办法精确地表示整数了。**因为丢失了精度，所以 9007199254740993 和 9007199254740995 不见了。**



---



**3.大整数 Big Integer**

```javascript
console.log(2 ** 2000); // Infinity
console.log(2n ** 2000n); //114813069527425452423283320117768198402231770208869520047764273682576626139237031385665948631650626991844596463898746277344711896086305533142593135616665318539129989145312280000688779148240044871428926990063486244781615463646388363947317026040466353970904996558162398808944629605623311649536164221970332681344168908984458505602379484807914058900934776500429002716706625830522008132236281291761267883317206598995396418127021779858404042159853183251540889433902091920554957783589672039160081957216630582755380425583726015528348786419432054508915275783882625175435528800822842770817965453762184851149029376n
```

---



**易错点**



NaN的特点是它与任何值都不想等，包括它本身,所以NaN === NaN-1是不正确的



---

```javascript
const a = 1/0
console.log(a === a-1); //true

const b1 = Infinity
const b2 = -Infinity
console.log( b1 === b1 - 1); //true
console.log( b2 === b2 -1); //true

const c1 = Number.MAX_VALUE
const c2 = Number.MAX_SAFE_INTEGER
const c3 = Number.MIN_VALUE
const c4 = Number.MIN_SAFE_INTEGER
console.log(c1 === c1-1); //true
console.log(c2 === c2-1); //false
console.log(c3 === c3-1); //false
console.log(c4 === c4-1); //false

const d = NaN
console.log( d === d-1); // false NaN与任何数都不相等(包括他本身)
```



**总结**:在以下情况下a===a-1:

- a为正负infinity
- a为任意一个超过JS精度范围的数
- a是一个大整数

### 3.手写原生ajax请求

```javascript
const ajax = {

    get( url, fn ){

        const xhr = new XMLHttpRequest()
        xhr.open('GET',url,true) //第三个参数 true代表异步,false代表同步
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                fn(xhr.responseText)
            }
        }
        xhr.send()
    },

    post(){
        const xhr = new XMLHttpRequest()
        xhr.open('POST',url,true)
        xhr.setRequestHeader('Conten-type','application/x-www-form-urlencoded')
        xhr.onreadystatechange = function(){
            if ( xhr.readyState === 4) {
                fn(xhr.responseText)
            }
        }
        xhr.send()
    }

}
```

### 4.手写new

先用文字描述一下 new 的实现过程

- 新定义一个 json 对象
- 对象 继承 构造函数的原型链
- 将构造函数的 this 指向这个对象
- 根据构造函数的返回值类型返回结果

```javascript
function myNew(fn,...args) {

    let obj = {} //创建一个新的对象
    obj.__proto__ = fn.prototype //对象继承构造函数的原型链
    fn.apply(obj,args) //将构造函数的this指向这个对象
    return obj;

}
 function Person() {
    
    this.name = arguments[0]
    this.age = arguments[1]
    this.gender = arguments[2]

 } 
 Person.prototype.sayHello = function() {

    console.log("你好呀,我是",this.name);
 }

//数据测试
 let test = myNew(Person,'张三','18','男')
 test.sayHello()
 console.log(test.name);
 console.log(test.age);

```

### 5.如何优雅的获取浮点数的整数和小数部分

#### 1.取整数

1.parseInt

```javascript
let num = 3.75;
console.log(parseInt(num)); // 3
num = -3.75;
console.log(parseInt(num)); // -3
```

用parseInt取整数，结果是没问题的，但是如果**严格来说**，其实**parseInt并不是设计用来取整数的**。

> **👉🏻 知识点：**`parseInt(string, radix)`` `这个方法是一个将字符串转换为整数的方法，它有两个参数，第一个参数表示要转换的字符串，如果参数不是一个字符串，则将其转换为字符串。第二个参数是基数即进制，默认为10。

所以用 parseInt 方法取整数，有**两个不好的地方**，一是 parseInt 这个函数名，看起来就是将字符串转整数的，用在这里不是很适合，另一个是转字符串有点多此一举，而且肯定会带来性能开销，所以使用 parseInt 虽然方便，但不是最好的办法。

2.Math方法

其中 Math.round 是四舍五入的，Math.ceil 是向上取整，Math.floor 是向下取整。

```javascript
function trunc(num){
    if(num >= 0) return Math.floor(num) //如果小于0 向上取整
    return Math.ceil(num) //向下取整
}
```

3.位操作

使用位操作方法，在运算过程中会把操作数转为成32位整数，如此，运算后的结果就是整数部分了

```javascript
let num = 3.75;
console.log(num | 0); // 3
num = -num;
console.log(num | 0); // -3
```

但是这样做也有缺陷

> 👉🏻 **冷知识**：因为bitwise操作将操作数转为Int32，所以它不能处理超过32位的数值取整，而JavaScript有效整数的范围是53位。

当数值范围超过32位时，它将不能对数值取整，而JavaScript有效整数的范围是53位。

那么用“|”有什么**好处**呢？如果考虑js文件大小，那么**a|0**与其他方式比较，是最短的方式，所以如果要考虑压缩代码的大小，且明确知道数值范围不会超过32位整数的时候，可以考虑使用这个技巧。

#### 2.取小数

1.parseInt+split

将数值转换成2字符串后切割并转换回数值

```javascript
const num = 12.76
const integer = parseInt(num.toString().split('.')[0])
const decimal = parseInt(num.toString().split('.')[1])//取小数
console.log(`${integer}.${decimal}`);
```

2.Math.trunc()

先用`Math.trunc(num)`取整，然后再与原数相减，就得到了小数部分。

```javascript
function fract(num) {
  return num - Math.trunc(num);
}
console.log(fract(3.75)); // 0.75
console.log(fract(-3.75)); // -0.75
```

3.取模运算

> **👉🏻 知识点：** JavaScript的取模运算%并不限于整数运算，可以对浮点数取模。

所以，直接将原数对1取模，即可获得小数部分！

```javascript
console.log(3.75 % 1); // 0.75
console.log(-3.75 % 1); // -0.75
```

### 3、instanceof关键字

遍历child的隐式原型链,如果隐式原型链上存在father的显式原型,则返回true,否则为false

```javascript
function instanceOf(father, child) {
    const fp = father.prototype
    var cp = child.__proto__

    while (cp) {
        if (cp === fp) {
            return true
        }
        cp = cp.__proto__
    }

    return false
}

```

### 4、实现防抖函数

```javascript
function debounce(fn, delay = 500) {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        const args = arguments        
        timer = setTimeout(() => {
            fn.apply(this, args) // 改变this指向为调用debounce所指的对象
        }, delay)
    }
}

```

### 5、实现节流函数

```javascript
function throttle(fn, delay = 200) {
    let flag = true
    return function () {
        if (!flag) return
        flag = false
        const args = arguments
        setTimeout(() => {
            fn.apply(this, args)
            flag = true
        }, delay)
    }
}

```

### 6、实现数组去重

> 题目描述：实现一个数组的去重

```javascript
// 第一种：Map记录
function quchong1(arr) {
    const newArr = []
    arr.reduce((pre, next) => {
        if (!pre.has(next)) {
            pre.set(next, 1)
            newArr.push(next)
        }
        return pre
    }, new Map())
    return newArr
}

// 第二种：Set去重
function quchong2(arr) {
    return [...new Set(arr)]
}

```

### 7、用setTimeout实现setInterval

> 题目描述：setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗

```javascript
function mySetTimout(fn, delay) {
    let timer = null
    const interval = () => {
        fn()
        timer = setTimeout(interval, delay)
    }
    setTimeout(interval, delay)
    return {
        cancel: () => {
            clearTimeout(timer)
        }
    }
}

// 测试
const { cancel } = mySetTimout(() => console.log(888), 1000)
setTimeout(() => {
    cancel()
}, 4000)

```

### 8、用setInterval实现setTimeout

> 题目说明：没有，就是想刁难你

```javascript
function mySetInterval(fn, delay) {
    const timer = setInterval(() => {
        fn()
        clearInterval(timer)
    }, delay)
}

// 测试
mySetInterval(() => console.log(888), 1000)

```

### 9、实现一个compose函数

> 题目说明：实现以下效果

```javascript
function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a)
console.log(a(1)); // 1+2+3+4=11

```

> 实现如下：

```javascript
function compose(...fn) {
    if (fn.length === 0) return (num) => num
    if (fn.length === 1) return fn[0]
    return fn.reduce((pre, next) => {
        return (num) => {
            return next(pre(num))
        }
    })
}

```

### 10、实现一个科里化函数

> 题目要求：

```javascript
const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3)) // 1 + 2 + 3=6

```

> 实现如下：

```javascript
function currying(fn, ...args1) {
  // 获取fn参数有几个
  const length = fn.length
  let allArgs = [...args1]
  const res = (...arg2) => {
    allArgs = [...allArgs, ...arg2]
    // 长度相等就返回执行结果
    if (allArgs.length === length) {
      return fn(...allArgs)
    } else {
      // 不相等继续返回函数
      return res
    }
  }
  return res
}

// 测试：
const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3))

```

### 11、实现一个LRU缓存函数

> 题目说明：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/866902be3c894edebc9a70446ed664df~tplv-k3u1fbpfcp-watermark.awebp?)

> 实现如下：

```javascript
class LRUCache {
  constructor(size) {
    this.size = size
    this.cache = new Map()
  }

  get(key) {
    const hasKey = this.cache.has(key)
    if (hasKey) {
      const val = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, val)
      return val
    } else {
      return -1
    }
  }

  put(key, val) {
    const hasKey = this.cache.has(key)
    if (hasKey) {
      this.cache.delete(key)
    }
    this.cache.set(key, val)
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value)
    }
  }

}

```

### 12、简单实现 发布订阅模式

> 题目描述:实现一个发布订阅模式拥有`on emit once off`方法

```javascript
class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(name, fn) {
        const tasks = this.cache[name]
        if (tasks) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }

    off(name, fn) {
        const tasks = this.cache[name]
        if (task) {
            const index = tasks.findIndex(item => item === fn)
            if (index >= 0) {
                this.cache[name].splice(index, 1)
            }
        }
    }

    emit(name, ...args) {
        // 复制一份。防止回调里继续on，导致死循环
        const tasks = this.cache[name].slice()
        if (tasks) {
            for (let fn of tasks) {
                fn(...args)
            }
        }
    }

    once(name, cb) {
        function fn(...args) {
            cb(args)
            this.off(name, fn)
        }
        this.on(name, fn)
    }
}

```

### 13、实现JSON.parse

> 题目描述：实现`JSON.parse`

```javascript
function parse (json) {
    return eval("(" + json + ")");
}

```

### 14、将DOM转化成树结构对象

> 题目描述：

```javascript
<div>
    <span></span>
    <ul>
        <li></li>
        <li></li>
    </ul>
</div>

将上方的DOM转化为下面的树结构对象

{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}

```

> 实现如下：

```javascript
function dom2tree(dom) {
    const obj = {}
    obj.tag = dom.tagName
    obj.children = []
    dom.childNodes.forEach(child => obj.children.push(dom2tree(child)))
    return obj
}

```

### 15、将树结构转换为DOM

> 题目描述：

```javascript
{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}

将上方的树结构对象转化为下面的DOM

<div>
    <span></span>
    <ul>
        <li></li>
        <li></li>
    </ul>
</div>

```

> 实现如下：

```javascript
// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}

```

### 16、判断一个对象有环引用

> 题目描述：验证一个对象有无环引用

```javascript
var obj = {
    a: {
        c: [
            1, 2
        ]
    },
    b: 1
}
obj.a.c.d = obj
console.log(cycleDetector(obj)) // true
```

> 实现思路：用一个数组存储每一个遍历过的对象，下次找到数组中存在，则说明环引用

```javascript
function cycleDetector(obj) {
    const arr = [obj]
    let flag = false

    function cycle(o) {
        const keys = Object.keys(o)
        for (const key of keys) {
            const temp = o[key]
            if (typeof temp === 'object' && temp !== null) {
                if (arr.indexOf(temp) >= 0) {
                    flag = true
                    return
                }
                arr.push(temp)
                cycle(temp)
            }
        }
    }

    cycle(obj)

    return flag
}

```

### 17、计算一个对象的层数

> 题目描述：给你一个对象，统计一下它的层数

```javascript
const obj = {
    a: { b: [1] },
    c: { d: { e: { f: 1 } } }
}

console.log(loopGetLevel(obj)) // 4

```

> 实现如下:

```javascript
function loopGetLevel(obj) {
    var res = 1;

    function computedLevel(obj, level) {
        var level = level ? level : 0;
        if (typeof obj === 'object') {
            for (var key in obj) {
                if (typeof obj[key] === 'object') {
                    computedLevel(obj[key], level + 1);
                } else {
                    res = level + 1 > res ? level + 1 : res;
                }
            }
        } else {
            res = level > res ? level : res;
        }
    }
    computedLevel(obj)

    return res
}
```

### 18、对象的扁平化

> 题目描述：

```javascript
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 
 flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }

```

> 实现如下：

```javascript
const isObject = (val) =>  typeof val === "object" && val !== null

function flatten(obj) {
  if (!isObject(obj)) return
  const res = {}
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`)
        })
      } else {
        for(let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
        }
      }
    } else {
      res[prefix] = cur
    }
  }
  dfs(obj, '')
  return res
}

// 测试
console.log(flatten(obj))

```

### 19、实现(a == 1 && a == 2 && a == 3)为true

> 题目描述：`实现(a == 1 && a == 2 && a == 3)为true`

```javascript
// 第一种方法
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
console.log(a == 1 && a == 2 && a == 3) // true

// 第二种方法
var a = [1, 2, 3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true

// 第三种方法
var val = 0;
Object.defineProperty(window, 'a', {
    get: function () {
        return ++val;
    }
});
console.log(a == 1 && a == 2 && a == 3) // true

```

### 20、实现限制并发的Promise调度器

> 题目描述：JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

```javascript
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
的输出顺序是：2 3 1 4

整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4

```

> 实现如下：

```javascript
class Scheduler {
  constructor(limit) {
    this.queue = []
    this.limit = limit
    this.count = 0
  }
  

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order)
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }

  taskStart() {
    for(let i = 0; i < this.limit; i++) {
      this.request()
    }
  }

  request() {
    if (!this.queue.length || this.count >= this.limit) return
    this.count++
    this.queue.shift()().then(() => {
      this.count--
      this.request()
    })
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();

```

### 21、实现lazyMan函数

> 题目描述：

```javascript
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

```

> 实现如下：

```javascript
class _LazyMan {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log(`Hi! This is ${name}`)
      this.next()
    }
    this.tasks.push(task)
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
  sleep(time) {
    this.sleepWrapper(time, false)
    return this
  }
  sleepFirst(time) {
    this.sleepWrapper(time, true)
    return this
  }
  sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    if (first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}

// 测试
const lazyMan = (name) => new _LazyMan(name)

lazyMan('Hank').sleep(1).eat('dinner')

lazyMan('Hank').eat('dinner').eat('supper')

lazyMan('Hank').eat('supper').sleepFirst(5)

```

### 22、实现add函数

> 题目描述：实现一个 add 方法 使计算结果能够满足如下预期：
>
> - add(1)(2)(3)()=6
> - add(1,2,3)(4)()=10

```javascript
function add(...args1) {
  let allArgs = [...args1]

  function fn(...args2) {
    if (!args2.length) return fn.toString()
    allArgs = [...allArgs, ...args2]
    return fn
  }

  fn.toString = function () {
    return allArgs.reduce((pre, next) => pre + next)
  }

  return fn
}

// 测试
console.log(add(1)(2)(3)())
console.log(add(1, 2)(3)())

```

### 23、实现一个合格的深拷贝

推荐看我这篇：[深拷贝有这5个段位，你只是青铜段位？还想涨薪？](https://juejin.cn/post/7017991655009566728)

### 24、实现 Promise

推荐看我这篇：[看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)【阅读：1.3w，点赞：460】

### 25、实现 async/await

推荐看我这篇：[7张图，20分钟就能搞定的async/await原理！为什么要拖那么久？](https://juejin.cn/post/7007031572238958629)【阅读：2.15w，点赞：460】

## Array篇

定义一个测试数组

```javascript
const players = [
    { name: '科比', num: 24 },
    { name: '詹姆斯', num: 23 },
    { name: '保罗', num: 3 },
    { name: '威少', num: 0 },
    { name: '杜兰特', num: 35 }
]

```

### 26、forEach

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this)
    }
}

players.sx_forEach((item, index, arr) => {
    console.log(item, index)
})
// { name: '科比', num: 24 } 0
// { name: '詹姆斯', num: 23 } 1
// { name: '保罗', num: 3 } 2
// { name: '威少', num: 0 } 3
// { name: '杜兰特', num: 35 } 4

```

### 27、map

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_map = function (callback) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this))
    }
    return res
}

console.log(players.sx_map((item, index) => `${item.name}--${item.num}--${index}`))
// [ '科比--24--0', '詹姆斯--23--1', '保罗--3--2', '威少--0--3', '杜兰特--35--4' ]

```

### 28、filter

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_filter = function (callback) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this) && res.push(this[i])
    }
    return res
}

console.log(players.sx_filter(item => item.num >= 23))
// [
//     { name: '科比', num: 24 },
//     { name: '詹姆斯', num: 23 },
//     { name: '杜兰特', num: 35 }
// ]

```

### 29、every

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_every = function (callback) {
    let flag = true
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this)
        if (!flag) break
    }

    return flag
}

console.log(players.sx_every(item => item.num >= 23)) // false
console.log(players.sx_every(item => item.num >= 0)) // true

```

### 30、some

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_some = function (callback) {
    let flag = false
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this)
        if (flag) break
    }

    return flag
}

console.log(players.sx_some(item => item.num >= 23)) // true
console.log(players.sx_some(item => item.num >= 50)) // false

```

### 31、reduce

参数代表含义

- pre：前一项
- next：下一项
- index：当前索引
- arr：数组本身

```javascript
Array.prototype.sx_reduce = function (callback, ...args) {
  let start = 0, pre
  if (args.length) {
      pre = args[0]
  } else {
      pre = this[0]
      start = 1
  }
  for (let i = start; i < this.length; i++) {
      pre = callback(pre, this[i], i, this)
  }
  return pre
}

// 计算所有num相加
const sum = players.sx_reduce((pre, next) => {
    return pre + next.num
}, 0)
console.log(sum) // 85

```

### 32、findIndex

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_findIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return i
        }
    }
    return -1
}

console.log(players.sx_findIndex(item => item.name === '科比')) // 0
console.log(players.sx_findIndex(item => item.name === '安东尼')) // -1

```

### 33、find

参数代表含义

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.sx_find = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i]
        }
    }
    return undefined
}

console.log(players.sx_find(item => item.name === '科比')) // { name: '科比', num: 24 }
console.log(players.sx_find(item => item.name === '安东尼')) // undefined

```

### 34、fill

用处：填充数组

参数代表含义

- initValue：填充的值
- start：开始填充索引，默认0
- end：结束填充索引，默认length

```javascript
Array.prototype.sx_fill = function (value, start = 0, end) {
  end = end || this.length
  for (let i = start; i < end; i++) {
      this[i] = value
  }
  return this
}

console.log(players.sx_fill('林三心', 1, 3))
// [
//     { name: '科比', num: 24 },
//     '林三心',
//     '林三心',
//     '林三心',
//     { name: '杜兰特', num: 35 }
// ]

```

### 35、includes

用处：查找元素，查到返回`true`，反之返回`false`，可查找`NaN`

```javascript
Array.prototype.sx_includes = function (value, start = 0) {
    if (start < 0) start = this.length + start
    const isNaN = Number.isNaN(value)
    for (let i = start; i < this.length; i++) {
        if (this[i] === value || (isNaN && Number.isNaN(this[i])) {
            return true
        }
    }
    return false
}

console.log([1, 2, 3].sx_includes(2)) // true
console.log([1, 2, 3, NaN].sx_includes(NaN)) // true
console.log([1, 2, 3].sx_includes(1, 1)) // false

```

### 36、join

用处：将数组用分隔符拼成字符串，分隔符默认为`,`

```javascript
Array.prototype.sx_join = function (s = ',') {
    let str = ''
    for(let i = 0; i < this.length; i++) {
        str = i === 0 ? `${str}${this[i]}` : `${str}${s}${this[i]}`
    }
    return str
}

console.log([1, 2, 3].sx_join()) // 1,2,3
console.log([1, 2, 3].sx_join('*')) // 1*2*3

```

### 37、flat

```javascript
Array.prototype.sx_flat = function (num = Infinity) {
  let arr = this
  let i = 0
  while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
      i++
      if (i >= num) break
  }
  return arr
}

const testArr = [1, [2, 3, [4, 5]], [8, 9]]

console.log(testArr.sx_flat(1))
// [1, 2, 3, 4, 5, 8, 9]

```

### 38、splice

难点

- 截取长度和替换长度的比较，不同情况

```javascript
Array.prototype.sx_splice = function (start, length, ...values) {
  if (length === 0) return []
  length = start + length > this.length - 1 ? this.length - start : length
  console.log(length)
  const res = [], tempArr = [...this]
  for (let i = start; i < start + values.length; i++) {
    this[i] = values[i - start]
  }
  this.length = start + values.length
  if (values.length < length) {
    const cha = length - values.length
    console.log(cha)
    for (let i = start + values.length; i < tempArr.length; i++) {
      this[i] = tempArr[i + cha]
    }
    this.length = this.length - cha 
  }
  if (values.length > length) {
    for (let i = start + length; i < tempArr.length; i++) {
      this.push(tempArr[i])
    }
  }
  for (let i = start; i < start + length; i++) {
    res.push(tempArr[i])
  }
  return res
}

```

## Object篇

定义一个测试对象

```javascript
const obj = {
    name: '林三心',
    age: 22,
    gender: '男'
}

```

### 39、entries

用处：将对象转成键值对数组

```javascript
Object.prototype.sx_entries = function (obj) {
    const res = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push([key, obj[key]])
    }
    return res
}

console.log(Object.sx_entries(obj))
// [ [ 'name', '林三心' ], [ 'age', 22 ], [ 'gender', '男' ] ]

```

### 40、fromEntries

用处：跟`entries`相反，将键值对数组转成对象

```javascript
Object.prototype.sx_fromEntries = function (arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        const [key, value] = arr[i]
        obj[key] = value
    }
    return obj
}

console.log(Object.sx_fromEntries([['name', '林三心'], ['age', 22], ['gender', '男']]))
// { name: '林三心', age: 22, gender: '男' }

```

### 41、keys

用处：将对象的key转成一个数组合集

```javascript
Object.prototype.sx_keys = function (obj) {
    const keys = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push(key)
    }
    return keys
}

console.log(Object.keys(obj))
// [ 'name', 'age', 'gender' ]

```

### 42、values

用处：将对象的所有值转成数组合集

```javascript
Object.prototype.sx_values = function (obj) {
    const values = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && values.push(obj[key])
    }
    return values
}

console.log(Object.sx_values(obj))
// [ '林三心', 22, '男' ]

```

### 43、instanceOf

用处：A instanceOf B，判断A是否经过B的原型链

```javascript
function instanceOf(father, child) {
    const fp = father.prototype
    var cp = child.__proto__

    while (cp) {
        if (cp === fp) {
            return true
        }
        cp = cp.__proto__
    }

    return false
}

function Person(name) {
    this.name = name
}
const sx = new Person('林三心')

console.log(instanceOf(Person, sx)) // true
console.log(instanceOf(Person, sx2)) // false

```

### 44、is

用处：Object.is(a, b)，判断a是否等于b

```javascript
Object.prototype.sx_is = function (x, y) {
    if (x === y) {
        // 防止 -0 和 +0
        return x !== 0 || 1 / x === 1 / y
    }

    // 防止NaN
    return x !== x && y !== y
}

const a = { name: '林三心' }
const b = a
const c = { name: '林三心' }

console.log(Object.sx_is(a, b)) // true
console.log(Object.sx_is(a, c)) // false

```

### 45、Object.assign

难点

- assign接收多个对象，并将多个对象合成一个对象
- 这些对象如果有重名属性，以后来的对象属性值为准
- assign返回一个对象，`这个对象 === 第一个对象`

```javascript
Object.prototype.sx_assign = function (target, ...args) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    target = Object(target)

    for (let nextObj of args) {
        for (let key in nextObj) {
            nextObj.hasOwnProperty(key) && (target[key] = nextObj[key])
        }
    }
    return target
}

const testa = { name: '林三心' }
const testb = { name: 'sunshine_lin', age: 22 }
const testc = { age: 18, gender: '男' }

const testd = Object.sx_assign(testa, testb, testc)
console.log(testd) // { name: 'sunshine_lin', age: 18, gender: '男' }
console.log(testa === testd) // true

```

## Function篇

### 46、call

```javascript
Function.prototype.sx_call = function (obj, ...args) {
    obj = obj || window

    // Symbol是唯一的，防止重名key
    const fn = Symbol()
    obj[fn] = this

    // 执行，返回执行值
    return obj[fn](...args)
}

const testobj = {
    name: '林三心',
    testFn(age) {
        console.log(`${this.name}${age}岁了`)
    }
}
const testobj2 = {
    name: 'sunshine_lin'
}

testobj.testFn.sx_call(testobj2, 22) // sunshine_lin22岁了

```

### 47、apply

```javascript
Function.prototype.sx_apply = function (obj, args) {
    obj = obj || window

    // Symbol是唯一的，防止重名key
    const fn = Symbol()
    obj[fn] = this

    // 执行，返回执行值
    return obj[fn](...args)
}

const testobj = {
    name: '林三心',
    testFn(age) {
        console.log(`${this.name}${age}岁了`)
    }
}
const testobj2 = {
    name: 'sunshine_lin'
}

testobj.testFn.sx_apply(testobj2, [22]) // sunshine_lin22岁了

```

### 48、Function.prototype.bind

难点：

- bind是返回一个函数，而不是执行结果
- bind返回的函数，拿来当做构造函数，该怎么处理

```javascript
Function.prototype.sx_bind = function (obj, ...args) {
    obj = obj || window

    // Symbol是唯一的，防止重名key
    const fn = Symbol()
    obj[fn] = this
    const _this = this

    const res = function (...innerArgs) {
        console.log(this, _this)
        if (this instanceof _this) {
            this[fn] = _this
            this[fn](...[...args, ...innerArgs])
            delete this[fn]
        } else {
            obj[fn](...[...args, ...innerArgs])
            delete obj[fn]
        }
    }
    res.prototype = Object.create(this.prototype)
    return res
}

```

## String篇

### 49、slice

参数代表含义

- start：开始截取的字符索引(包含此字符)
- end：结束截取的字符索引(不包含此字符)

注意点

- start > end：返回空字符串
- start < 0：`start = 数组长度 + start`

```javascript
String.prototype.sx_slice = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end

    if (start >= end) return ''
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }

    return str
}

console.log(str.sx_slice(2)) // nshine_lin
console.log(str.sx_slice(-2)) // in
console.log(str.sx_slice(-9, 10)) // shine_l
console.log(str.sx_slice(5, 1)) // ''

```

### 50、substr

参数代表含义

- start：开始截取的字符索引(包含此字符)
- length：截取的长度

注意点

- start < 0：`start = 数组长度 + start`
- length超出所能截取范围，需要做处理
- length < 0：返回空字符串

```javascript
String.prototype.sx_substr = function (start = 0, length) {
    if (length < 0) return ''

    start = start < 0 ? this.length + start : start
    length = (!length && length !== 0) || length > this.length - start ? this.length : start + length

    let str = ''
    for (let i = start; i < length; i++) {
        str += this[i]
    }
    return str
}

console.log(str.sx_substr(3)) // shine_lin
console.log(str.sx_substr(3, 3)) // shi
console.log(str.sx_substr(5, 300)) // ine_lin

```

### 51、substring

功能与`slice`大致相同

区别之处

- start > end：互换值

```javascript
String.prototype.sx_sunstring = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end

    if (start >= end) [start, end] = [end, start]
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }

    return str
}

console.log(str.sx_sunstring(2)) // nshine_lin
console.log(str.sx_sunstring(-2)) // in
console.log(str.sx_sunstring(-9, 10)) // shine_l
console.log(str.sx_sunstring(5, 1)) // unsh

```

## Promise篇

### 52、all

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 如果所有Promise都成功，则返回成功结果数组
- 如果有一个Promise失败，则返回这个失败结果

```javascript
    function all(promises) {
        const result = []
        let count = 0
        return new MyPromise((resolve, reject) => {
            const addData = (index, value) => {
                result[index] = value
                count++
                if (count === promises.length) resolve(result)
            }
            promises.forEach((promise, index) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData(index, res)
                    }, err => reject(err))
                } else {
                    addData(index, promise)
                }
            })
        })
    }

```

### 53、race

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 哪个Promise最快得到结果，就返回那个结果，无论成功失败

```javascript
    function race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(promise)
                }
            })
        })
    }
```

### 54、allSettled

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 把每一个Promise的结果，集合成数组，返回

```javascript
    function allSettled(promises) {
        return new Promise((resolve, reject) => {
            const res = []
            let count = 0
            const addData = (status, value, i) => {
                res[i] = {
                    status,
                    value
                }
                count++
                if (count === promises.length) {
                    resolve(res)
                }
            }
            promises.forEach((promise, i) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData('fulfilled', res, i)
                    }, err => {
                        addData('rejected', err, i)
                    })
                } else {
                    addData('fulfilled', promise, i)
                }
            })
        })
    }
```

### 55、any

any与all相反

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 如果有一个Promise成功，则返回这个成功结果
- 如果所有Promise都失败，则报错

```javascript
    function any(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            promises.forEach((promise) => {
                promise.then(val => {
                    resolve(val)
                }, err => {
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}
```

### 56、finally

- 接收一个回调函数，但无参数接收
- 无论成功失败状态，都会执行finally

```javascript
Promise.prototype.finally = function(callback) {
  return this.then(res => {
    callback()
    return res
  }, err => {
    callback()
    throw err
  })
}
```

