

//对对象数组进行id去重

const arrObj = [
    {id:'1',name:'张三'},
    {id:'2',name:'李四'},
    {id:'1',name:'王五'},
]

const arr = arrObj.reduce( (p,n) => {
    !p.find( i => i.id === n.id ) && p.push(n)
    return p
},[])
console.log(arr);