 prop = 36;
var o = {
    prop:37,
    bar1:function(){
        function foo1(){
            return this.prop;
        }
        return foo1;
    },
    bar2:function(){
        var foo2 = (()=>this.prop);
        return foo2;
    }
}

console.log("result1:",o.bar1()());
console.log("result2:",o.bar2()());

var fn2 = o.bar2;
console.log("result3:"+fn2()());