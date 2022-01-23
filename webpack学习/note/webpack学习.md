webpack学习

## 1.安装并运行webpack

**安装:**

- 下载node.js(webpack运行在node环境上)
- 命令行输入`npm webpack webpack-cli --save-dev` 

**运行:**

- 在项目根目录下创建src文件夹,并新建一个index.js文件
- 在命令行输入`npx webpack`

生成dist文件夹,并且含有一个index.js文件则说明打包成功

## 2.自定义webpack配置

在项目根目录创建一个名为`webpack.config.js`文件

文件内容格式如下

```javascript
const path = require('path')
module.exports = {
    entry:'./src/index.js',//表示打包项目的入口文件
    output:{
        filename:'bundle.js',//表示打包后项目文件的名称
        path:path.resolve(__dirname,'./dist')//打包后项目文件的存放地址
    },
    mode:'none' //模式
}
```

接下来我们尝试自定义webpack配置并将项目运行到浏览器

我们创建一个src文件夹,并在文件夹中创建`hello-world.js`和`index.js`

其中,`index.js`作为项目的入口js文件,`hello-world.js`作为一个功能型文件

hello-world.js

```javascript
function helloWrold(){
    console.log("hello world");
}
export default helloWrold
```

index.js

```javascript
import helloWrold from './hello-world'
helloWrold()
```

配置`webpack.config.js`

```javascript
const path = require('path')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    mode:'none'
}
```

然后在控制台执行`npx webpack`

我们会发现dist文件夹中生成了一个名为`bundle.js`的文件,这就是我们项目打包后的入口文件

接下来,我们在index.html中引入这个入口文件

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <script src="./dist/bundle.js"></script>
</body>
</html>

```

项目结构如下·

![image-20220123134723416](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123134723416.png)

在浏览器中打开

说明已经成功运行

###### ![image-20220123134637749](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123134637749.png)

## 3.webpack插件

### 1.什么是插件

> Webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack **flexible**.
>
> Webpack有一个丰富的插件接口。 webpack中的大部分特性都使用了这个插件接口。 这使得webpack更加灵活。  

### 2.使用HtmlWebpackPlugin插件

**HtmlWebpackPlugin**插件可以帮我们在打包时自动生成入口html文件,减少繁琐的手动配置html

下载:

- 执行`npm install html-webpack-plugin -D`

- 在`webpack.config.js`中引入插件

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  ```

- 在配置项中配置插件

  ```javascript
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
      entry:'./src/index.js',
      output:{
          filename:'bundle.js',
          path:path.resolve(__dirname,'./dist')
      },
      mode:'none',
      plugins:[
          new HtmlWebpackPlugin({
              template:'./index.html',//模板文件
              filename:'app.html',//打包后入口html文件名
              inject:'body'//引入的js文件的存放位置
          })
      ]
  }
  ```

使用这个插件打包后,webpack会根据模板html生成对应的入口html文件,入口html文件与模板html文件会相互对应起来,如下图所示

![image-20220123144605165](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123144605165.png)

## 4.mode选项

### 1.介绍

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

```
string = 'production': 'none' | 'development' | 'production'
```

![image-20220123154205800](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123154205800.png)

### 2.配置mode选项

只需要在`webpack.config.js`中将mode设置为相应的option就可以了

```javascript
module.exports = {
	...
    mode:'development'
}
```

### 3.使用watch mode

**watch mode**(观察模式)

> Webpack 可以监听文件变化，当它们修改后会重新编译。
>
> 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。

**配置:**

webpack.config.js

```javascript
module.exports = {
  //...
  watch: true,
};
```

或者在打包时执行`npx webpack --watch`

演示:

![GIF 2022-1-23 15-51-18](webpack%E5%AD%A6%E4%B9%A0.assets/GIF%202022-1-23%2015-51-18.gif)

### 4.使用webpack-dev-server

`webpack-dev-server`为你提供了一个基本的web server,并且具有live reloading(实时重新加载)功能

`webpack-dev-server`默认开启`watch mode`

安装:

`npm install --save-dev webpack-dev-server`

配置:

在`webpack.config.js`中

```javascript
module.exports = {
	...
    devServer:{
        static:'./dist' //打包项目的路径
    }
}
```

![image-20220123160141435](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123160141435.png)

## 5.资源模块

### 1.介绍

> 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。



资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

**webpack.config.js**

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
+       dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
}
```

### 2.Resource资源

修改`webpack.config.js`配置

```javascript
module.exports = {
   ...
   	module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/, //表示允许引入的资源类型
                type:'asset/resource'
            }
        ]
    }
}
```

在`index.js`中引入图片并显示在页面上

```javascript

import image from './assets/test.jpg'

var img = document.createElement('img')
img.src = image
document.body.appendChild(img)
```

打包后

dist文件夹中生成了相关的图片文件

![image-20220123171155337](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123171155337.png)

浏览器显示

![image-20220123171109954](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123171109954.png)

---



默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 来修改此模板字符串：

使用此配置后,所有以`asset/resource`模块中引入的文件都会以对应的格式发送到输出目录

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

---

另一种自定义输出文件名的方式是，将某些资源发送到指定目录：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
     }
-     },
+     {
+       test: /\.html/,
+       type: 'asset/resource',
+       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
+     }
    ]
  },
};
```

使用此配置，所有 `html` 文件都将被发送到输出目录中的 `static` 目录中。

`Rule.generator.filename` 与 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。



### 3.inline资源

`asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。

意味着打包时dist目录将不会生成图片文件,页面中的图片以base64格式呈现,如下图所示

![image-20220123173204484](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123173204484.png)

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-  	assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
-       test: /\.png/,
-       type: 'asset/resource'
+       test: /\.svg/,
+       type: 'asset/inline'
-     },
+     }
-     {
-       test: /\.html/,
-       type: 'asset/resource',
-       generator: {
-         filename: 'static/[hash][ext][query]'
-       }
-     }
    ]
  }
};
```

我们在**index.js**中引入图片文件后

会发现dist目录中并没有生成相应的图片文件

### 4.source资源

`asset/source` 导出资源的源代码。

意味着打包时dist目录也将不会生成资源文件

**webpack.config.js**

```diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
-       test: /\.svg/,
-       type: 'asset/inline',
-       generator: {
-         dataUrl: content => {
-           content = content.toString();
-           return svgToMiniDataURI(content);
-         }
-       }
+       test: /\.txt/,
+       type: 'asset/source',
      }
    ]
  },
};
```

在index.js中

```javascript
import text from './assets/abc.txt'

const block = document.createElement('div')
block.textContent = text
block.style.cssText = `width:200px;height:200px;background:aliceblue`
document.body.appendChild(block)
```

执行后在浏览器中成功显示相关txt文件信息

![image-20220123174058904](webpack%E5%AD%A6%E4%B9%A0.assets/image-20220123174058904.png)



### 5.通用资源类型

调用资源类型`asset`,在导出一个data URI和发送一个单独的文件之间自动选择

修改配置文件:

```javascript
module.exports = {
	...
    module:{
        rules:[
            {
                test: /\.jpg$/,
                type:'asset'
            }
        ],
    
    }
}
```

现在，webpack将按照默认条件,自动的在`resource`和`inline`之间进行选择:小于8kb的文件,将会视为`inline`模块类型，否则被视为`resource`类型

可以在rule层级中,设置`Rule.parse.dataUrlCondition.maxSize`选项来修改此条件



例如我们设置maxsize为`200*1024`

现在引入一个大于200kb的文件,dist文件夹中将生成对应的资源文件否则将不会生成
