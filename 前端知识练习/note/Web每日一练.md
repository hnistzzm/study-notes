# Web每日一练

## 1.async和defer

我们知道js代码执行是**从上往下**的,所以如果代码执行到某一处时可能会发生阻塞,妨碍下方代码继续执行

我们讨论下`async`和`defer`

script标签与执行顺序有关的的属性:

- async
  - 不阻塞页面的渲染,在获取到js文件后立即执行js中的代码
- defer
  - 不阻塞代码的执行,在获取到js文件后不立即执行,等页面渲染完成后才执行js中的代码
- 不填
  - 阻塞页面渲染,获取到js文件并且执行完js中的文件后再继续往下执行代码		



多说无用,直接看demo

这里我们在一个html文件中引入一个js文件,将script标签写在span标签之前

js文件中代码的作用时进行一个延时,并向页面中添加一个p标签

```javascript
var start = Date.now();
while(Date.now() - start < 2000){}//这里延时2s

var p = document.createElement('p');
p.innerText = 'OK'
document.body.appendChild(p);
```

![image-20220614170244106](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141702162.png)



当我们不设置async或defer属性时,页面是这样的,先执行js文件中的代码(延时2s然后向页面添加p标签),然后继续向下执行渲染页面,所以过程`打印ok->页面渲染`

![image-20220614170528507](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141705545.png)

当设置属性为async时,不阻塞页面渲染(代码继续向下执行),在获取到js文件后执行文件中的代码(延时2s然后向页面添加p标签),然后再继续向下执行

过程是`页面渲染->打印ok->页面渲染`

![image-20220614170628579](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141706613.png)

当设置属性为defer时,不阻塞页面渲染(代码继续向下执行),在获取到js文件后也不执行文件中的代码,等待页面全部渲染完毕之后,再执行js文件中代码

过程是`页面渲染->打印ok`

![image-20220614170950313](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141709356.png)

## 2.属性名的类型

题目:

```javascript
var a = {};
var b = {key:'b'};
var c = {key:'c'};

a[b] = 123;
a[c] = 456;
console.log(a[b]);
```

上面代码会输出什么？

答案是:**456**

为什么?

这里牵扯到这几个知识点:

- 对象的属性名类型
- a.key和a[key]的区别
- [对象].toString()的结果



**对象的属性名类型**

对象的属性名类型只能有两种,分别是String和Symbol,如果新增的属性的类型不是两种中的任意一种,那么就会调用toString()方法将其转换成string类型

**[对象].toString()的结果**

设有一个对象obj,obj.toString()的结果是`[object,object]`

![image-20220614175647886](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141756918.png)

**a.key和a[key]的区别**

假设有一个对象a

```javascript
let a = {key:'a'}
```

执行a.key实际上会获取a中属性名为`key`的属性,这里的`key`是一个字符串,实际上就是获取a[‘key’]

而执行a[key],会去寻找名为`key`的变量,所以`a[key] !== a[‘key’]`

```javascript
let a  = {key:'a'};

console.log(a.key);//'a'
console.log(a['key']);//'a'
console.log(a[key]);//error
```



弄懂了这几个知识点了,我们就可以知道刚刚代码的结果了

![image-20220614180318663](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202206141803696.png)

- 由于b和c都是对象,所以调用a[b]或a[c]都会将执行对象的toString方法,a[b]等价于a[‘[object,object]’],a[c]等价于a[‘[object,object]’]

  所以上方代码都是对a[‘[object,object]’]进行重新赋值

  最终会输出**456**