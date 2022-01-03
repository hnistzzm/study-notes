# MongoDB学习

### 1.安装

- 官网下载安装包

- 配置环境变量

  找到mongoDB文件夹的bin目录,将地址添加在环境变量的path中

  ![image-20220103151538220](C:\Users\zhangzhenming\AppData\Roaming\Typora\typora-user-images\image-20220103151538220.png)

- win+R(cmd) 输入`mongod --version`查看是否能获取到版本号,获取到说明已经安装成功

  ![image-20220103151746095](C:\Users\zhangzhenming\AppData\Roaming\Typora\typora-user-images\image-20220103151746095.png)

### 2.开启和关闭数据库

启动

```shell
# mongodb默认使用执行mongod命令所处盘符根目录下的/data/db作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己·手动新建一个/data/db目录
mongod
```

如果想要修改默认的数据存储目录,可以:

```shell
mongob --dbpath=数据存储目录路径
```

停止:

`ctrl+c`

### 3.连接和退出数据库

连接:

```shell
# 该命令默认连接本机的mongodb服务
mongo
```

退出:

```shell
#在连接状态下输入exit退出连接
```

### 4.基本命令

- `show dbs`
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称`
  - 切换到指定的数据库(如果没有则会新建一个数据库)
- `db.dropDatabase()`
  - 删除数据库(先切换到需要删除的数据库,在执行删除命令)
- `db.collection.drop()`
  - 删除集合
- `db.createCollection(name,options)`
  - name:要创建的集合名称
  - options:可选参数,指定有关内存大小及索引的选项
  - 创建集合
- `db.collection.drop()`
  - 删除集合
- `db.COLLECTION_NAME.insert(document)`
  - 插入数据
  - 若插入的数据主键已经存在,则会抛出异常
- `db.collection.update(<query>,<update>,{upsert:<boolean>,multi:<boolean>,writeConcern:<document>})`
  - 更新数据
  - query：update的查询条件,类似sql update查询内where后面的
  - update:update的对象和一些更新的操作符,可以理解为sql update内set后面的
  - upsert:可选,如果不存在update的记录是否仍然插入.默认是false,不插入
  - multi:可选,如果为true则更新所有符号条件的记录,若为false,只更新找到的第一天记录
  - writeConcern:可选,抛出异常的级别
- `db.collection.remove(<query>,{justone:<boolean>,writeConcern:<document>})`
  - query:(可选)删除文档的条件
  - justOne:(可选)如果设置为true或1，则只删除一个·文档,如果不设置该参数,或使用默认值false，则删除所有匹配条件的文档
- `db.collection.find(query,projection)`
  - query:可选,使用查询操作指定查询条件
  - projection:可选,使用投影操作符指定返回的键.查询时返回文档中所有的键值
- `db.collection.find.pretty()`
  - 以格式化的方法显示所有文档

