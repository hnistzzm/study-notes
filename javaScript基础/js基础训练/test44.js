let parseQueryString = function(url, key) {
    //请在此处编写你的代码，其他部分请勿修改，否则不记分。
    //begin
        

        let paramsObj = {};
        let paramsArr = [];

        let pathStr = '';
        

        let urlArr = url.split('/')
        pathStr = urlArr[urlArr.length - 1];  

        console.log('pathStr',pathStr);
        let paramsStr = '';
        for(let i=0;i<pathStr.length;i++){
          if(pathStr[i] === '?'){
            paramsStr = pathStr.slice(i+1);
          }
          
        }
        console.log('paramsStr',paramsStr);

        paramsArr = paramsStr.split('&')
        console.log('paramsArr',paramsArr);

        for(let i=0;i<paramsArr.length;i++){
            
           let params = paramsArr[i].split('=');
        //    ParamsMap.set(params[0],params[1])
            paramsObj[params[0]] = params[1];
          
        }
      
        // return ParamsMap.get(key);
        return paramsObj[key];
      
      
      
    //end
    // 以下代码请勿修改
    }

    console.log(parseQueryString('https://www.didichuxing.com/path?key1=a&key2=123&key_3=key2', 'key_3')); 

