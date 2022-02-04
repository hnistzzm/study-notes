
Array.prototype.cs_splice = function(start = 0,deleteCount,...args){
    // [1,2,3,4] 0 1 2 1
    if(deleteCount === 0 ) return []
    deleteCount = start + deleteCount > this.length -1 ? this.length - start : deleteCount
    const res = [] ,tempArr = [...this]  

    for (let i = start; i < start + args.length; i++) {
        this[i] = args[i-start]
    }    
    //[2,1,3,4]
    this.length = start + args.length
    //[2,1]
    if(args.length < deleteCount){
        const cha = this.length - this.values.length
        for (let i = start+this.values.length; i < tempArr.length; i++) {
            this[i] = tempArr[i+cha]
            
        }
        //[2,1,3,4]
        this.length -= cha
    }
    if (args.length > deleteCount) {
        for (let i = start + deleteCount; i < tempArr.length; i++) {
          this.push(tempArr[i])
        }
      }
    for (let i = start; i < start + deleteCount; i++) {
        res.push(tempArr[i])
      }
      return res

}
