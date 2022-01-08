

const swap = (arr,i,j) => { [arr[i],arr[j]] = [arr[j],arr[i]] } //交换数组中的两个位置

function getrandom(arr){

    for (let i = arr.length-1; i >= 0 ; i--) {
        //Math.random随机范围为[0,1),Math.floor向下取整    
        const randomIndex = Math.floor( Math.random()*i)
        console.log(arr[randomIndex]);
         //随机过的位置放后面
        swap(arr,i,randomIndex)
    }
}
const arr = [1,2,3,4,5,6,7,8,9,10]
getrandom(arr)