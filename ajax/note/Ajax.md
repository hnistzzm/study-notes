## Ajax

### 1.什么是 AJAX ？

AJAX = 异步 JavaScript 和 XML。

AJAX 是一种用于创建快速动态网页的技术。

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。

有很多使用 AJAX 的应用程序案例：新浪微博、Google 地图、开心网等等。

### 2.AJAX 工作原理

![image-20220106155444799](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282111971.png)

### 3.XHR创建对象

所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）。

XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新

创建 XMLHttpRequest 对象的语法：

`variable=new XMLHttpRequest();`

老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

`variable=new ActiveXObject("Microsoft.XMLHTTP");`

```javascript
const xmlhttp
if(window.XMLHttpRequest)
{
     //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
    
}else{
  
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    
}

```

### 4.发起请求

与 **POST** 相比，**GET** 更简单也更快，并且在大部分情况下都能用。

然而，在以下情况中，请使用 **POST** 请求：

- 不愿使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（**POST** 没有数据量限制）
- 发送包含未知字符的用户输入时，**POST** 比 **GET** 更稳定也更可靠



**GET**:

```javascript
xmlhttp.open("GET",url,true)
xmlhttp.send();
```

**POST**

post请求相较于get请求,需要为其添加请求头,然后在 send() 方法中规定您希望发送的数据

```javascript
xmlhttp.open("POST",url,true)
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");
```

### 4.获取响应

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

![image-20220106164201408](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202203282111087.png)





### 5.Ajax实例

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

    post(url,fn){
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

