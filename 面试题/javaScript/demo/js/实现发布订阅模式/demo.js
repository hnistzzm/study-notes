class EventEmitter{
    constructor(){
        this.cache = {}
    }
    /**
     * 注册事件
     * @param {String} name 事件名
     * @param {Function} fn 回调函数
     */
    on(name,fn){
        const tasks = this.cache[name]
        tasks ? this.cache[name].push(fn) : this.cache[name] = [fn]
    }
    /**
     * 移除事件
     * @param {String} name 
     * @param {Function} fn 
     */
    off(name,fn){
        const tasks = this.cache[name]
        if(tasks){
           const index = tasks.findIndex( item => item === fn)
           if(index >= 0){
                this.cache[name].splice(index,1)
           }
        }
    }
    /**
     * 发布事件
     * @param {String} name 
     * @param  {...any} args 
     */
    emit(name,...args){
        const tasks = this.cache[name]
        if(tasks){
            for (const fn of tasks) {
                fn(...args)
            }
        }
    }
    /**
     * 注册一个事件,触发后马上移除
     * @param {String} name 
     * @param {Function} cb 回调函数
     */
    once(name,cb){
        function fn(...args){
            cb(...args)
            this.off(name,fn)
        }
        this.on(name,fn)
    }   
}