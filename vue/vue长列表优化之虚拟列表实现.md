# vue长列表优化之虚拟列表实现

**应用场景**:后台一次性发送上千条或更多数据给前台

场景模拟:用户发起一个请求,后台发送了10w条数据

**使用虚拟列表之前**:前台需要生成10w个dom节点用来渲染页面

**使用虚拟列表之后**:前台只需要生成少量dom节点(dom节点数量取决于前端视图需要展示的数量),就可以实现对这10w条数据的视图渲染

总之:**虚拟列表就是固定dom节点数量,通过修改dom节点的内容而达到不重新增加(或删除)dom节点来实现列表的更新**

## 1.实现原理

![img](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202205301819365.png)

1. 监听页面滚动,获取滚动的高度scrolltop
2. 根据scrolltop,可以知道当前应该展示哪一段数据(即获取要展示数据的index)
3. 根据当前展示的数据在长列表中的index,对列表进行偏移



实现思路是这样的:



1. **设置列表初始值**

   1. 需要展示给用户的数量**showNum**
   2. 列表item的高度**itemHeight**
   3. 需要展示的第一条数据的下标**start**
   4. 需要展示的最后一条数据的下标**end**
   5. 通过start和end已经**showNum**,我们可以得到需要展示的列表项**showList**,我们可以通过vue的计算属性来实时获取新的**showList**

2. **建立列表视图模型**

   1. 给列表视图设置高度**ListWrapHeight**
   2. 根据**itemHeight**和**showNum**,我们可以得到列表总高度**ListHeight**,我们必须要使得**ListHeight**高度大于**ListWrapHeight**,这样才能实现滚动

3. **监听页面滚动**

   1. 给列表视图模型设置监听函数,每当列表视图发生滚动,就执行回调,获取滚动高度**scrolltop**
   2. 通过**scrolltop**和**itemHeight**我们可以得到新的**start**以及**end**,从而获取到新的**showList**
   3. 通过start和itemHeight我们可以给list设置偏移(translate),从而达到让start对应的数据展示在视图模型的效果

   

   注意:列表视图模型和列表并不是一个东西,视图模型表示者页面供列表展示的一块区域,而列表表示的是需要展示的列表项总高度

   **这是列表视图模型**

   ![image-20220530183845436](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202205301838481.png)

   **这是列表**

   ![image-20220530183906181](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202205301839228.png)

   

   列表中超出视图模型的节点就被隐藏了

   

   **为什么限制了展示列表项的长度(限制了dom数量),视图模型还能持续滚动？**

   给列表设置translate会增大列表的高度,既然list的高度变大了,那么视图模型就可以继续滚动

   

​	实现代码

​	以vue3为例(不管是vue2或是vue3,实现虚拟列表的核心代码都是相同的,即监听滚动,赋新值)

```html
<div ref="listWrap" class="list-wrap" @scroll="scrollListener">

    <div class="list" ref="List">
		
        <slot  v-for="item in showList" :songInfo="item" :key="item.id"></slot>
        
    </div>
    
    
  </div>
```



```javascript
  setup(props) {
    const list = ref(props.list); //长列表数据
    const itemHeight = ref(props.itemHeight); //item高度
    const showNum = ref(props.showNum); //展示的数据
    const start = ref(props.start); //滚动过程中的开始索引
    const end = ref(props.end); //滚动过程中的结束索引

    const listWrap = ref(null); //获取列表视图模型节点
    const List = ref(null)//获取列表节点

    onMounted(() => {

        
        listWrap.value.style.height = itemHeight.value * showNum.value + "px";//设置列表视图模型的高度

       
    });



    const showList = computed(() => {
      //获取展示的列表
      return list.value.slice(start.value, end.value);
    });

    const scrollListener = (() => {
           //获取滚动高度
            let scrollTop = listWrap.value.scrollTop;

            
            //开始的数组索引
            start.value = Math.floor(scrollTop / itemHeight.value);
            //结束索引
            end.value = start.value + showNum.value;

            
         
            List.value.style.transform =  `translateY(${start.value * itemHeight.value}px)`//对列表项进行偏移



    })

    return {
      ...
    };
  },
```



效果:

![GIF 2022-5-30 18-45-24](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202205301846360.gif)



节点变化

可以看到不论列表如何变化,列表dom的数量并没有新增

![GIF 2022-5-30 18-47-14](http://image-yunsheng.test.upcdn.net/typora-cloud-img/raw/master/202205301847633.gif)