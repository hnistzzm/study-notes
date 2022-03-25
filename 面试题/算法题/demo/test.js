/**
 * initialize your data structure here.
 */
 var MinStack = function() {
    this.minin = Number.MAX_SAFE_INTEGER;
    // this.topin = null;
    this.stk = [];

    return this.stk;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    
    this.minin = (this.minin < x) ? this.minin : x;

    this.stk.push(x);
    console.log("push",this.stk);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    console.log("pop",this.stk);
    this.stk.length--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    console.log("top",this.stk);
    // return this.stk[this.stk.length-1] || null;
    return 1;
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.minin;
};
 var obj = new MinStack()
  obj.push(5)
  obj.pop()
//   var param_3 = obj.top()
//   var param_4 = obj.min()
  console.log(obj)
