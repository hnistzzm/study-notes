
function Mvvm(options = {}){

    // vm.$options Vue上是将所有属性挂载到上面
    // 所以我们也同样实现,将所有属性挂载到了$options
    this.$options = options;
     // this._data 这里也和Vue一样
    let data = this._data = this.$options.data;
    console.log(data === this._data);
     //数据劫持
    observe(data);
    
     //数据代理 可由将数据绑定到mvvm实例上,不需要每次都通过mvvm._data.xxx这种方式来操作数据
     for (const key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get(){
                return this._data[key];
            },
            set(newVal){
                this._data[key] = newVal;
            }
        });
     }

    //编译
    new Compile(options.el,this);
  

   
   
}
//数据编译
function Compile(el,vm){

    vm.$el = document.querySelector(el);
    
    //将dom放入文档碎片中,防止多次操作dom,减少开销
    let fragment = document.createDocumentFragment();

    while(child = vm.$el.firstChild){
        fragment.appendChild(child); //将el中的内容放入内存中
    }


    //对el中的内容进行替换
    function replace(frag){
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            console.log("txt",txt);
            let reg =  /\{\{(.*?)\}\}/g; //正则匹配{{}}

 
            if(node.nodeType === 3 && reg.test(txt)){ //既是文本节点又有大括号的情况{{}}
                function replaceTxt() {
                    
                    node.textContent = txt.replace(reg, (matched, placeholder) => {   
                        console.log(placeholder);   // 匹配到的分组 如：song, album.name, singer...
                        new Watcher(vm, placeholder, replaceTxt);   // 监听变化，进行匹配替换内容
                        
                        return placeholder.split('.').reduce((val, key) => {
                            console.log("val",val);
                            return val[key];  
                        }, vm);
                    });
                };
                // 替换
                replaceTxt();
            }
            if (node.nodeType === 1) {  // 元素节点
                let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;   // v-model  type
                    let exp = attr.value;   // c        text
                    if (name.includes('v-')){
                        node.value = vm[exp];   // this.c 为 2
                    }
                    // 监听变化
                    new Watcher(vm, exp, function(newVal) {
                        console.log("watcherval",newVal);
                        node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
                    });
                    
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        console.log("newval",newVal);
                        // 相当于给this.c赋了一个新值
                        // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
                        vm[exp] = newVal;   
                    });
                });
           }
              // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        })
    }
    replace(fragment);//替换内容
    vm.$el.appendChild(fragment);
}

function Observe(data) {
    //数据劫持就是给对象增加get,set
    let dep = new Dep();
    for (const key in data) {//把data属性通过defineProperty的方式定义属性
       let val = data[key];
       observe(val); //继续递归实现深度的数据劫持
       Object.defineProperty(data,key,{
           configurable: true,
           get(){
                Dep.target && dep.addSub(Dep.target);   // 将watcher添加到订阅事件中 [watcher]
                return val;
           },
           set(newVal){
                if(val === newVal){ //设置的值和以前值一样就不理它
                    return;
                }
                val = newVal; //如果以后再获取值(get)的时候，将刚才设置的值再返回去
                observe(newVal);// 当设置为新值后，也需要把新值再去定义成属性
                dep.notify();   // 让所有watcher的update方法执行即可
           }
       })
    }
}

function observe(data){
    // 如果不是对象的话就直接return掉
    // 防止递归溢出
    if(!data || typeof data !== 'object') return;
    return new Observe(data);
}

//发布订阅模式
function Dep(){
    //存放函数的事件池
    this.subs = [];
}
Dep.prototype = {
    addSub(sub){
        this.subs.push(sub)
    },
    notify(){
        //绑定的方法都有一个update方法
        this.subs.forEach(sub => sub.update());
    }
}
//监听函数·
function Watcher(vm,exp,fn){
    this.fn = fn; //将fn放在实例上
    this.vm = vm;
    this.exp = exp;

    Dep.target = this;
    let arr = exp.split('.');
    let val = vm;
    arr.forEach(key => {    // 取值
        val = val[key];     // 获取到this.a.b，默认就会调用get方法
    });
    Dep.target = null;

}
Watcher.prototype.update = function(){
    // notify的时候值已经更改了
    // 再通过vm, exp来获取新的值
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {    
        val = val[key];   // 通过get获取到新的值
    });
    this.fn(val);
}