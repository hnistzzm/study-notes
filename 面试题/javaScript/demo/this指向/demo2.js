
a = 10;

let obj = {

    a:20,
    
    fun:function(params) {
        let a = 30;
        let say = ()=>{
            console.log(this.a);
        }
        say();

    },
    
}

obj.fun();