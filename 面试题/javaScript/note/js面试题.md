## 1.为什么0.1+0.2不等于0.3?

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

## 2.在什么情况下a === a-1？

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

## 3.手写原生ajax请求

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

