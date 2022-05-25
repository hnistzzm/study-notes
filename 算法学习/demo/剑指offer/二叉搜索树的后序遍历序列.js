
//剑指offer 33

var verifyPostorder = function(postorder) {

    const index = postorder.findIndex(item => item > postorder[postorder.length-1]);
  
    // if(index <= 0 || index >= postorder.length-1){
  
    //     return true;
    // }
    if(postorder.length <= 1) return true;
  
    let left = postorder.slice(0,index);
    let right = postorder.slice(index,postorder.length-1);
  
    console.log("left: " + left);
    console.log("right: " + right);
  
    for(let i=0;i<right.length;i++){
        if(right[i] <= postorder[postorder.length-1]){
            return false;
        }
    }
  
    return verifyPostorder(left) && verifyPostorder(right);
  
  
  };
  
  console.log(verifyPostorder([1,2,5,10,6,9,4,3]));