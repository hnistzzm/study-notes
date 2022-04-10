function getMaxCap(capBag,pipBag,n,s){
    
    let dp = new Array(n+1).fill(0).map(()=>new Array(s+1).fill(0));
    console.log(dp);
    for(let i=1;i<=n;i++){
        for(let j=1;j<=s;j++){
            if(j - pipBag[i-1] < 0){//如果容量不足,则只能选择不装
                console.log("容量不够");
                dp[i][j] = dp[i-1][j];
            }else{//如果容量足够,选择装与不装的最大值
                console.log("容量足够");
                dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-pipBag[i-1]]+capBag[i-1])
                console.log(i,j);
                console.log("dp[i][j]",dp[i][j]);
            }
        }
    }
    
    return dp[n][s];
    
    
}
console.log(getMaxCap([3,5,2,2,1],[1,2,1,4,6],5,5));