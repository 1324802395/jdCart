class Ajax{
    static ajax(param={}){
        // 解构赋值
        let {url,method,data,dataType='json'}=param

        if(url==null){
            throw new Error('地址不能为空')
        }

        let arr=[]
        if (data) {
            for(let att in data){
                arr.push(`${att}=${data[att]}`)
            }
        }
        // 将数组转为查询字符串
        let selectStr=arr.join('&')
        param.data=selectStr;

        // 发送请求
        return Ajax.http(param)


    }

    static http(param){
        let {url,method,data,dataType='json'}=param;

        return new Promise((resolve,reject)=>{

        if (method=='get') {
            url=url+'?'+data
            data=null
        }

        let xhr=new XMLHttpRequest()
        xhr.open(method,url)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');

        // if (method=='post') {
        //     xhr.send(data);
        // }else{
        //     xhr.send();
        // }
        xhr.send(data)

        xhr.onreadystatechange=function(){
            if (xhr.readyState==4) {
                if (xhr.status==200) {
                    if (dataType=='json') {
                    data=JSON.parse(xhr.response)
                    // console.log(res);
                }
                // success && success(xhr.response)
                    resolve(data)
                }else{
                    reject(xhr.status)
                }
                
            }
        }
    })
    }

}