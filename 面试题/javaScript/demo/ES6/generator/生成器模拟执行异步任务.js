function getUsers(){
    setTimeout(()=>{
        let data = '用户数据'
        iterator.next(data)//在next方法中传入形参可以作为对应yield的返回值
    },1000)
}
function getOrders(){
    setTimeout(()=>{
        let data = '订单数据'
        iterator.next(data)
    },1000)
}
function getGoods(){
    setTimeout(()=>{
        let data = '商品数据'
        iterator.next(data)
    },1000)
}
function * gen(){
    const users = yield getUsers()
    console.log(users);//用户数据
    const orders = yield getOrders()
    console.log(orders);//订单数据
    const goods = yield getGoods()
    console.log(goods);//商品数据
}
let iterator = gen()
iterator.next()