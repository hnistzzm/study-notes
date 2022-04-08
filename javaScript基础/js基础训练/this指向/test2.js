
let obj = {
    name:'张三',
    fn1:function(){
        console.log("fn1",this.name);
        function  fn2(){
            console.log("fn2",this.name);
        }
        fn2();
        obj.fn3()
    },
    fn3:function(){
        console.log("fn3",this.name);
    }

};
obj.fn1()


// function test1() {
//     console.log("test1",this);
//     function test2() {
//         console.log("test2",this);
//     }
//     test2()
// }
// test1()
