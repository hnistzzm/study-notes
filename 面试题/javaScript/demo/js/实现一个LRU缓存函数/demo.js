
/**
 * 实现一个LRU缓存函数
 */
class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  put(key,value) {

    const hasKey = this.cache.has(key)

    if(hasKey){
        this.cache.delete(key)
    }
    this.cache.set(key,value)
    if(this.cache.size > this.size){
        this.cache.delete(this.cache.keys().next().value)
    }

  }

  get(key) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      const val = this.cache.get(key);

      this.cache.delete(key);
      this.cache.set(key, val);

      return val;
    } else {
        return -1;
    }
  }
}
