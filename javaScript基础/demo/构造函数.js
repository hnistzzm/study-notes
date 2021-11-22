

function Person() {
    this.name = "齐白石"
    this.gender = "男"
    this.getName = ()=>{
        console.log("我是齐白石");
    }
}
let per = new Person()
per.getName()