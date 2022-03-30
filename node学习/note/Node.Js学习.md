# 5Node.Js学习

## 1.对文件的各种操作

首先需要引入**fs**模块

```javascript
const fs = require('fs')
```

### 1.写入文件

==fs.writeFile(‘**文件路径**’,’**文本内容**’,**call()**)==

```javascript
const fs = require('fs')
fs.writeFile("写入和读取文件/data/hello.txt",'hello,nodeJs',function(err){
    if(err){
        console.log("写入文件失败!",err.message);
        return
    }
    console.log("写入文件成功!");
})
```

代码成功执行后,会在data文件夹中创建hello.txt文件

![image-20211108130450154](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282116023.png)

### 2.读取文件

==fs.readFile(‘**文件路径**’,**call()**)==

```javascript
const fs = require('fs')
fs.readFile('hello.txt',function(err,data){
    if(err){
        console.log("读取文件失败!",err.message);
        return
    }
    console.log(data.toString());
})
```



### 3.打开文件并将内容存入缓冲流

**打开文件**:fs.open(path, flags[, mode], callback)

参数使用说明如下：

- **path** - 文件的路径。
- **flags** - 文件打开的行为。具体值详见下文。
- **mode** - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
- **callback** - 回调函数，带有两个参数如：callback(err, fd)。

![image-20211108130823432](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117613.png)

---



读取文件:fs.read(fd, buffer, offset, length, position, callback)

参数使用说明如下：

- **fd** - 通过 fs.open() 方法返回的文件描述符。
- **buffer** - 数据写入的缓冲区。
- **offset** - 缓冲区写入的写入偏移量。
- **length** - 要从文件中读取的字节数。
- **position** - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
- **callback** - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。

---



```javascript
const fs = require('fs')
var buf = new Buffer.alloc(1024);
fs.open('写入和读取文件/data/hello.txt','r+',function(err,fd){
    if(err){
        console.log("打开文件失败!",err.message);
        return
    }
    console.log("打开文件成功!");
    console.log("准备读取文件");
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){
        if(err){
            console.log("读取文件失败",err.message);
        }
        console.log(bytes+"字节被读取");
        // 仅输出读取的字节，
        if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());//hello,nodeJs
        }

    })

})
```

## 2.创建http服务

`首先引入http模块`

```javascript
const http = require('http')
```

==创建http服务==

```javascript
const server = http.createServer()
```

```javascript
const http = require('http')
const server = http.createServer()

server.on("request",function(){
    console.log("收到客户端请求了");
})
server.listen(3000,function(){
    console.log("服务器创建成功!");
})
```

当我们请求3000端口时,服务器就会接收到请求

![image-20211108133118472](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117195.png)

---

服务器对请求进行响应

server.on中的回调函数接收两个参数 request和responce

responce中有一个**write**方法 :可以用来给客户端发送响应数据,并且可以使用多次·

还有一个**end**方法:用来结束响应,否则客户端会一直等待

**注意**:

1.向客户端发送数据时只能发送字符串或者二进制数据,如果像发送类似数组、对象的数据,则需要使用==JSON.stringify()==将其转换为json字符串

2.发送数据时解决中文乱码的问题

```javascript
 res.setHeader('Content-Type','text/plain; charset=utf-8')

```

---



当客户端请求url为/a 响应requestA 

当客户端请求url为/b 响应requestB

....

```javascript
const http = require('http')
const server = http.createServer()

server.on("request",function(req,res){
    console.log("收到客户端请求了,请求路径是",req.url);
    const reqUrl = req.url
    if(reqUrl == '/a'){
        res.write('requestA')
        res.end()
    }else if(reqUrl == '/b'){
        res.write('requestB')
        res.end()
    }else if(reqUrl == '/c'){
        res.write('requestC')
        res.end()
    }else{
        res.write('NormalRequest')
        res.end()
    }
})
server.listen(3001,function(){
    console.log("服务器开启成功");
})
```

客户端效果:

请求 /a

![image-20211108135022540](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117611.png)

请求 /b

![image-20211108135037723](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117467.png)

普通请求

![image-20211108135054546](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117861.png)

## 3.响应内容类型

响应普通文本

```javascript
res.setHeader('Content-Type','text/plain; charset=utf-8')
```

响应html文本

```javascript
res.setHeader('Content-Type','text/html; charset=utf-8')
```

---

将客户端响应一个含有图片的页面

js文件

```javascript
const http = require('http')
const fs = require('fs')
const server = http.createServer()
server.on("request",function(req,res){
    console.log("收到客户端请求了,请求路径是",req.url);
    const reqUrl = req.url
    res.setHeader('Content-Type','text/html; charset=utf-8')//解决中文乱码
    if(reqUrl === '/'){
        fs.readFile('test.html',function(err,data){
            if(err){
                res.end('页面加载失败!')
                return
            }
            res.end(data)
        })
    }else{
         // 获取到图片的url
        fs.readFile('.' + reqUrl, function (err, data) {
            res.end(data);
            
        })
    }
})
server.listen(3002,function(){
    console.log("服务器开启成功");
})
```

html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>首页</h1>
    <img src="boy.jpg" alt="">
</body>
</html>
```

图片文件:与html同级的boy.jpg

页面效果

![image-20211108165158465](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117662.png)

## 4.使用模板引擎向客户端传递信息

### 1.art-template(模板引擎）

下载方式:==npm i art-template==

使用方式详见文档：

[art-template文档](https://aui.github.io/art-template/zh-cn/docs/api.html)

### 2.使用模板引擎替换html页面

art-template中有一个API:template.render(source, options)

它的功能是编译并返回渲染结果，即它可以将html文本中指定的内容替换成我们需要的内容

如果我们需要替换一个内容,需要在html文档中使用{{}}双括号来表示内容(与vue相似)

例如:

我们需要将张三的姓名渲染在页面上,

```javascript
var content = template.render(‘html文档的路径’, {
					name:'张三'
				})
```



html文档:

```html
<h1>{{name}}<h1>
```



这样就可以将name替换为张三了

## 5.URL模块

### 1.API

##### `new URL(input[, base])`

- `input` [](http://url.nodejs.cn/9Tw2bK) 要解析的绝对或相对的输入网址。 如果 `input` 是相对的，则需要 `base`。 如果 `input` 是绝对的，则忽略 `base`。
- `base` [](http://url.nodejs.cn/9Tw2bK) | [](http://nodejs.cn/api/url.html#the-whatwg-url-api) 如果 `input` 不是绝对的，则为要解析的基本网址。

通过相对于 `base` 解析 `input` 来创建新的 `URL` 对象。 如果 `base` 作为字符串传入，则其将被解析为等效于 `new URL(base)`。

```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

网址构造函数可作为全局对象的属性访问。 也可以从内置的 url 模块中导入：

```js
import { URL } from 'url';
console.log(URL === globalThis.URL); // 打印 'true'.
```

如果 `input` 或 `base` 不是有效的网址，则将抛出 `TypeError`。 注意，会将给定的值强制转换为字符串。 例如：

```js
const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/
```

出现在 `input` 的主机名中的 Unicode 字符将使用 [Punycode](http://url.nodejs.cn/C2g98n) 算法自动转换为 ASCII。

```js
const myURL = new URL('https://測試');
// https://xn--g6w251d/
```

只有在启用 [ICU](http://nodejs.cn/api/intl.html#options-for-building-nodejs) 的情况下编译 `node` 可执行文件时，此功能才可用。 如果不是，则域名将原封不动地传入。

如果事先不知道 `input` 是否是绝对的网址并且提供了 `base`，则建议验证 `URL` 对象的 `origin` 是否符合预期。

```js
let myURL = new URL('http://Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https://Example.com/', 'https://example.org/');
// https://example.com/

myURL = new URL('foo://Example.com/', 'https://example.org/');
// foo://Example.com/

myURL = new URL('http:Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https:Example.com/', 'https://example.org/');
// https://example.org/Example.com/

myURL = new URL('foo:Example.com/', 'https://example.org/');
// foo:Example.com/
```

##### `url.hash`[#](http://nodejs.cn/api/url.html#urlhash)

获取和设置网址的片段部分。

```js
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// 打印 #bar

myURL.hash = 'baz';
console.log(myURL.href);
// 打印 https://example.org/foo#baz
```

分配给 `hash` 属性的值中包含的无效的网址字符会进行[百分比编码](http://nodejs.cn/api/url.html#percent-encoding-in-urls)。 选择要进行百分比编码的字符可能与 [`url.parse()`](http://nodejs.cn/api/url.html#urlparseurlstring-parsequerystring-slashesdenotehost) 和 [`url.format()`](http://nodejs.cn/api/url.html#urlformaturlobject) 方法产生的结果有所不同。

##### `url.host`[#](http://nodejs.cn/api/url.html#urlhost)

获取和设置网址的主机部分。

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
// 打印 example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href);
// 打印 https://example.com:82/foo
```

分配给 `host` 属性的无效主机值将被忽略。

更多见文档

[node.js文档](http://nodejs.cn/api/url.html#class-url)

## 6.通过设置状态码让客户端网页重定向

- 状态码设置位302为临时重定向，304为永久重定向.res.statusCode = 302

- 在响应头中通过location指定重定向的url  res.setHeader(‘locaton’,’/’)

  ```javascript
  res.statusCode = 302
  res.setHeader('Location', '/')//执行此命令后,客户端会再次向服务端发起请求,请求的url为'//'
  ```

  

## 7.模块系统

### 1.模块的导入与导出

**导入**:`require(xxx.js)`

**导出:**

- `exports`

  ```javascript
  exports.a = 1
  exports.b = 2
  ```

  

- `module.exports`

  ```javascript
  module.exports.a = 1
  module.exports = {a:1,b:2}
  ```

区别:module.exports可以直接复制,例如`module.exports=1`,而exports不能直接赋值

```javascript
module.exports = 1//right
exports = 1//err
```

### 2.exports与module.exports的区别

在模块导入导出的过程中,node底层为每个js文件都创建了一个名为**module**的**对象**，module对象中有一个含有一个名为exports的成员变量

```javascript
module:{
    exports:{},
    ....
}
```

并且在每个js文件末尾,node都为我们添加了以下代码

```javascript
return module.exports
```

每当我们通过require导入模块时,上面的语句就会执行,**所以我们导入的模块是其实就是module.exports对象**

`exports`与`module.exports`**都指向同一个地址值**

```javascript
console.log(exports === module.exports)//true
```

export是对module.exports的引用,即

```javascript
var exports = module.exports
```

所以，exports和module.exports是等价的,为了减少代码的冗余,**我们可以使用exports代替module.exports**

并且两者可以同时使用，例如

```javascript
module.exports.a = 1
exports.b = 2
```

当我们引入上述模块时,会获得`{a:1,b:2}`

错误导出示例:

```javascript
module.exports.a=1
exports.b=2
exports={}
exports.c=3
```

当我们引入上述模块时,我们拿到的对象为`{a:1,b:2}`

**原因:**程序执行`exports={}`这段代码时,exports的指向已经发生了改变,此时exports与module.exports已经不再指向同一个对象,所以之后对exports的任何操作都无法改变module.exports所指向的值

完整示例:

foo.js

```javascript
var test = require("./main.js")
console.log(test.add(1,2))//3
console.log(test.obj.a)//1
```

main.js

```javascript
function add(x,y)
{
    return x+y
}
let obj = {
    a:1,
    b:2
}
/*方式一*/
exports.add = add//将add函数赋值给exports.add
exports.obj = obj
/*方式二*/
module.exports = {add,obj}
```

![image-20211122181326774](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117088.png)

### 3.require方法加载规则

当我们使用require方法导入模块时,node会优先从缓存中加载模块,举例

a.js

```javascript
require('./b.js')
require('./c.js')
```

b.js

```javascript
require('./c.js')
console.log("b模块被加载了")
```

c.js

```javascript
console.log("c模块被加载了")
```

当我们执行a.js时，控制台的输出情况是

```javascript
c模块被加载了
b模块被加载了
```

`原因`:当我们执行b.js时,引入了c.js模块,此时c模块已经被存入缓存中,当我们在a.js中再次引入c.js时,node直接从缓存中读取c.js，故而不会读取c.js中的代码

### 4.es6中的模块导入方法与node中的区别

node中的导入导出方式是:

导入:**require**

`require('./xxx')`

```javascript
var add = require('./main')
console.log(add.add(1,2));
console.log(add.obj.a);
```



导出:**exports**  **module.exports**

- `export.a=1`

- `module.exports.a=1`

  ```javascript
  
  function add(x,y){
      return x+y
  }
  let obj = {
      a:1,
      b:2
  }
  /*方式一*/
  exports.add = add//将add函数赋值给exports.add
  exports.obj = obj
  /*方式二*/
  module.exports = {add,obj}
  ```

  

es6中的导入导出方式是

导入:

- 通用导入方式

  ` import * as xx(修改引用名) from ‘xxx’(要引入的模块的地址)`

  ```javascript
  import * as m1 from './js/m1.js'
  console.log(m1.a)
  m1.fun()
  import * as m3 from './js/m3.js'
  console.log(m3);
  console.log(m3.default.school);
  ```

  

- 解构赋值导入方式

  `import {a,b}(es6中解构赋值的形式获取模块暴露的变量) from ’xxx‘(要引入的模块的地址) `

  ```javascript
  	import {a,fun} from './js/m1.js'
      console.log(a);
      import {school,getSchool} from './js/m2.js'
      console.log(school);
      import {default as m3} from './js/m3.js'//将默认暴露的default对象用变量m3来接收
      m3.change()
  ```

  

- 针对默认暴露的导入方式

  `针对默认暴露 不需要像通用导入和解构赋值一样使用default.属性来调用`

  ```javascript
     import m3 from './js/m3.js'
      console.log(m3);
      console.log(m3.school)
      m3.change()
  ```

  

导出:

- 分别暴露

  ```javascript
  export const a = 1
  export function fun(){
      console.log("我是分别暴露的函数");
  }
  ```

  

- 统一暴露

  ```javascript
  let school = '朝阳小学'
  function getSchool(){
      console.log(school);
  }
  export {school,getSchool}
  ```

- 默认暴露

  ```javascript
  export default {
      school:'大哥大',
      change:function(){
          console.log("我们可以改变世界!");
      }
  }
  ```

  

**区别**：

对于node中的模块系统，在模块导入导出的过程中,node底层为每个js文件都创建了一个名为**module**的**对象**，module对象中有一个含有一个名为exports的成员变量

在导出模块时,需要往exports对象中添加需要导出的属性和方法

对于es6中的模块方法,我们可以通过import来导入模块,通过export和export default来导出模块,并可以使用解构赋值等新特性来使得导入导出更加便捷

## 8.node中的模块加载规则

#### 1.**模块加载顺序**

1. **从缓存中加载**
2. **核心模块**
3. **路径形式的文件模块**
4. **第三方模块**

分析:

**优先级1：**

**从缓存中加载模块**

node在执行程序时,会将引入的模块存入缓存中，方便下次引用时直接从缓存中读取，而不需要重新引用,这样做可以加快程序执行速度,减少不必要的时间浪费

所以当我们加载模块时,node会优先从缓存中寻找指定模块

**优先级2:**

**加载核心模块**

node为我们准备了一些核心模块,例如文件模块`fs`,网络模块`http`等,当我们引入模块时,node会优先加载这些文件

```javascript
require('fs')
```



**优先级3:**

**加载以路径形式引入的文件模块**

加载我们定义的文件,文件一般用相对路径引入

```javascript
require('./a.js')
```



**优先级4:**

**加载第三方模块**

```javascript
require('a')
```



第三方模块指的是我们通过npm或者其他方式下载的含有特定功能的库,这些库存在于node_modules文件夹中,node通过寻找node_modules中的模块来进行引入



---

第三方模块的引入顺序

当我们引入一个第三方库时,node会将这个含有第三方库的·文件夹存储在**node_modules**文件夹中(如果没有node_modules文件夹则自动创建),第三方库的文件夹含有一个**package.json**文件,文件内的**main**可以指定这个库的入口文件,当我们引入第三方库实际上就是引用这个入口文件

**package.json**

`package.json`可以指定模块的入口文件,如果不指定`main`或者模块中没有`package.json`文件,node会寻找这个库中名为`index.js`的文件作为这个模块的**入口文件**

```javascript
{
    "main":"index.js"，//如果指定为index.js,则入口文件为index.js,如果为a.js,则入口文件为a.js
    ....
}
```

**index.js**

```javascript
/*这个第三方库所含有的方法、属性等等...*/
```

---

另外,当与我们同级目录中的**node_modules**没有找到我们引入的模块时,node会向上一级目录的node_modules文件夹中寻找(寻找规则与前者相同),直到找到我们需要的模块.

如果寻找到项目的根目录仍然没有找到我们需要的模块,则控制台报错:`can't found module xxx`

---

我们手动模拟一下第三方模块的引入过程

我们创建一个test.js文件，用来引入模块

**test.js**

```javascript
require('a')
```

a模块,作为我们创建的第三方模块

a模块:文件结构为

​			`---index.js`

​			`---package.json`

**index.js**

```javascript
console.log("a模块的index被加载了");
```

package.json

```json
{
    "main":"index.js"
}
```

执行test.js

控制台输出以下结果

![image-20211123213156524](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117414.png)

以上的引入过程

从test.js同级目录下寻找node_modules目录

然后寻找名为a的模块目录,

找到之后寻找a中的package.json文件中main指定的入口文件index.js

最终成功引入模板，也就是index.js

## 9.npm操作

`npm`全名**node package manager**，即node包管理器

要了解npm,我们要先了解npm中最重要的一个文件，即`package.json`(**包说明文件**)

### 1.package.json

我们建议每个项目都要有一个`package.json`文件,他能对我们项目的基本信息进行描述,并且当我们使用npm进行一系列操作时都需要用到`package.json`

怎么生成`package.json`文件?

指令:`npm init`

当我们在控制台输入以上指令,控制台就会根据我们的需求生成含有相应内容的`package.json`文件

输入指令:npm init，根据我们的需求输入信息

![image-20211125165103245](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117836.png)

输入结束后,系统会自动创建`package.json`文件,内容就是我们所填入的信息

**解释**:

`entry point`:**入口文件**,即当我们运行项目时,系统会执行entry point所指定的入口文件

**注意**:如果我们不指定入口文件,系统会默认将index.js文件作为我们项目的入口文件

### 2.package-lock.json

npm5以前是不会生成`package-lock.json`这个文件的

当使用npm安装包的时候，npm都会自动生成或者更新`package-lock.json`

作用:

- `package-lock.json`会保存`node_modules`中的所有包信息(版本、下载地址)
  - 这样的话当我们重新`npm install`时下载的速度就会提升许多
- 会保存包的版本信息，可以用来**锁定版本**



### 3.npm命令

- `npm init`：生成package.json文件
  - npm init -y:跳过向导,直接生成默认的package.json文件

- `npm install xxx`:下载一个名为xxx的第三方依赖库,可以简写为`npm i xxx`

```shell
# npm install jquery
```

- `npm install xxx --save`:下载一个名为xxx的第三方依赖库并将依赖信息保存在`package.json`文件中,简写:`-S`

```shell
# npm install jquery --save
```

使用 --save指令有什么作用？

在下载文件时使用--save指令会在下载文件的同时将文件信息存储在package.json文件中,例如

我们执行以下命令

```shell
# npm install jquery --save
```

可以发现`package.json`的dependencies中增加了jquery的依赖信息

![image-20211125170304989](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117130.png)

有了这个依赖信息,当我们不小心将依赖包删除或者因为一些操作使得依赖包出现问题时,我们可以很轻松的还原这个依赖包

- `npm install`:一次性把`package.json`中dependencies保存的依赖项全部安装

这就印证了上方`--save`的必要性

例如我现在将node_modules删除,然后执行`npm install`指令,会发现npm直接帮我们下载了我们原来的依赖包,也就是说:

**只要我们的`package.json`中存在依赖信息，执行`npm install`指令就能帮我们重新下载依赖信息对应的依赖包**

![image-20211125170847068](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117683.png)

- `npm uninstall xxx`：卸载名为xxx的依赖库,packge.json中的依赖信息依然保存
  - `npm uninstall xxx --save`:卸载依赖库的同时将依赖信息也删除

- `npm -v`:查看npm版本号
- `npm install --global npm`：将npm版本号升级到最新版本

### 4.下载淘宝镜像

npm服务器在国外,国内下载速度很慢，为了解决此问题,淘宝为npm做了一个镜像服务器cnpm

**安装指令：**

```shell
# npm install --global cnpm
```

下载完成后,就可以使用cnpm代替npm了,操作方式与npm 一样



如果不想安装cnpm又想使用淘宝的服务器来下载

你可以在每个npm指令后加入这段话：`--registry=http://registry.npm.taobao.org`

```shell
# npm install xxx --registry=http://registry.npm.taobao.org
```

直接将这个选项加入配置文件中,一劳永逸

```shell
# npm config srt registry http://registry.npm.taobao.org
```

配置之后,你所有的npm操作都会默认通过淘宝的服务器来下载


加油

## 10.使用nodemon解决node修改代码后需要手动重启的问题

`nodemon`是一个第三方库，**他能监视我们node项目代码的变化,每当代码被修改后,它能自动重启node项目,**我们可以不需要频繁的手动重启服务器

**下载**:`npm install --global nodemon`

注意使用global将它下载到全局

安装完毕后,

**使用方法**:`nodemon xxx`  xxx为我们执行的js文件

示例:

```javascript
nodemon app.js
```

![image-20211128200047752](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117531.png)



## 11.express框架

### 1.安装以及基本使用

安装:`npm install express --save`

引用:`var express = require('express')`

```javascript
var express = require('express')
var app = express()
app.listen(3000,function(){
    ...
})
```

### 2.express中的静态资源服务

在express中设置静态资源服务,**可以使得客户端可以通过url请求到后台的静态资源**

`app.use('url请求路径',express.static('存放静态资源的文件夹路径'))`

```javascript
//如果不设置请求路径,则用户url请求中也不能带有’public‘
app.use(express.static('public'))
//当用户请求url以public开头时,后台从public文件夹中加载对应资源
app.use('/public',express.static('public'))
//当用户请求url以public开头时,后台从public文件夹中加载对应资源
app.use('/static',express.static('static'))

app.use('/static',express.static(path.join(__dirname,'static')))
```



**示例:**

**客户端请求后台的静态资源**

假设静态资源存放在文件夹public中

```javascript
var express = require('express')
var app = express()
app.use('/public',express.static('./public'))//设置静态资源请求和获取方式
```

**客户端请求静态资源**

请求后端public文件夹下的comment.json文件

![image-20211129192722727](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282117894.png)

**如果不设置请求路径**

```javascript
var express = require('express')
var app = express()
app.use(express.static('./public'))//设置静态资源请求和获取方式
```

请求方式为

![image-20211129192910258](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282118747.png)

### 3.express中使用模板引擎

安装

```javascript
npm install art-template --save
npm install express-art-template --save
```

配置：

```javascript
app.engine('html',require('express-art-template'))
```

使用:

```javascript
app.get('/',function(req,res){
    res.render('xxx.html')
})
```

注意:express会默认去目录views中寻找相应的html文件

如果希望修改默认的`views`视图渲染存储目录，你可以

```javascript
//注意第一个参数views不能改变
app.set('views',目录路径)
```

实例:

app.js

```javascript
var express = require('express')
var app = express()
app.engine('html',require('express-art-template'))
app.get('/post',function(req,res){
    res.render('hello.html',{
        title:'你好世界'
    })
})
```

hello.html(html文档声明及结构省略)

```html
<h1>{{title}}</h1>
```

![image-20211129194127178](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282118148.png)

### 4.express中通过中间件获取post请求体数据

在express中没有内置的获取表单post请求体的api，这里我们需要使用中间件`body-parser`来获取post请求体

安装: `npm install body-parser --save`

配置:

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
//加入这个配置后就可以直接通过req.body获取表单post请求中的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

示例:

post.html

```javascript
<form action="/post" method="post">
        <input type="text"  name="name">
        <input type="text"  name="message">
      <button type="submit">发表</button>
</form>
```

app.js

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
//加入这个配置后就可以直接通过req.body获取表单post请求中的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/post',function(req,res){
    console.log(req.body)
})
```

### 5.express获取get请求参数

获取get参数不需要中间件，直接调用`req.query`即可获取

```javascript
app.get('/get',function(req,res){
    console.log(req.query)
})
```

### 6.crud案例

接下来我们实现一个**学生信息增删改查**的案例

#### **1.功能:**

- 显示学生信息
- 添加学生信息
- 删除学生信息
- 修改学生信息

#### 2.路由设计

| 请求方法 | 请求路径         | get参数 | post参数                | 备注             |
| -------- | ---------------- | ------- | ----------------------- | ---------------- |
| GET      | /students        |         |                         | 渲染首页         |
| GET      | /students/new    |         |                         | 渲染添加页面     |
| POST     | /students/new    |         | name,age,gender,hobbies | 处理添加学生请求 |
| GET      | /students/edit   | id      |                         | 渲染编辑页面     |
| POST     | /students/edit   |         | id,age,gender,hobbies   | 处理编辑学生请求 |
| GET      | /students/delete | id      |                         | 处理删除请求     |

#### 3.提取路由模块

router.js

```javascript
/* 
    moduleIntro:项目路由组件
    information:此模块处理客户端发送的请求,根据不同的请求方法+请求路径设置具体的请求函数
*/
var express = require('express')
var router = express.Router()

var Students = require('./students')
var errlog = require('../public/js/errlog')

router.get('/students',function(req,res){
   
})

router.get('/students/new',function(req,res){
  
})

router.post('/students/new',function(req,res){
   
})

router.get('/students/edit',function(req,res){
    
    
})

router.post('/students/edit',function(req,res){
  
})

router.get('/students/delete',function(req,res){
    
})

module.exports = router
```

#### 4.编写步骤

- 处理模板
- 配置开放静态资源
- 配置模板引擎
- 配置路由
- 路由设计
- 提取路由模块
- 封装业务API

---



项目源码在demo中的express-crud中

### 7.回调函数

解释:回调函数就是我们在调用一个函数或者API时，向其传递一个函数作为参数供其调用

使用场景:对于异步API，例如ajax请求等操作我们可以使用回调函数，等待请求拿到数据后在执行后面的操作

示例:

```javascript
function fun1(){
    const x=1,y=2
    add(x,y,function(data){
        console.log(data)
    })
}

//callback就是fun1传递过来的回调函数
function add(x1,y1,callback){
    setTimeOut(()=>{//模拟异步情况，当延时1s后，调用回调函数，将x+y的结果返回给fun1
        callback(x1+y1)
    },1000)
    
}
```

模拟ajax请求

```javascript
//向后端发起请求获取数据
function getdata(){
    datarequest(...,function(err,data){//传入请求参数和回调函数
        //得到数据后进行一系列操作...
    })
}
//从数据库获取数据并f
function datarequest(...,callback){
    ... //从数据库获取数据data等一系列操作
    if(err) return callback(err)//如果失败，返回err
    return callback(null,data)//如果成功，返回data
}
```

封装ajax方法

```sql
function get(url,callback){
	let oReq = new XMLHttpRequest()
	//当请求加载成功后要调用指定的函数
	oReq.onload = function(){
		callback(oReq.responceText)
	}
	oReq.open('get',url,true)
	oReq.send()

}
//调用ajax
get('data.json',function(data){
    console.log(data)
})
```

