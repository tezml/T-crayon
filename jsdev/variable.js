const paramType = (data,type) => {
    let paramArr = [];
    let paramStr = '';

    let forJson = (data,parent) => {
        for (let attr in data) {
            if(Object.prototype.toString.call(data[attr]).toLowerCase() == "[object array]"){
                parent.push(attr + '=' + JSON.stringify(data[attr]));
            }else if (typeof(data[attr]) == "object" && Object.prototype.toString.call(data[attr]).toLowerCase() == "[object object]" && !data[attr].length) {
                parent.push(attr + '=' + JSON.stringify(data[attr]));
            }else{
                parent.push(attr + '=' + data[attr]);
            }
        }
    };
    forJson(data,paramArr);
    paramStr = paramArr.join('&');
    type == "GET" ? paramStr = '?' + paramStr : paramStr;
    return paramStr
};


const ajax = (json) => {
    let params = {
        path : json.path || "",
        param : json.param || {},
        success : json.success || function () {},
        type : json.type || "GET",
        outLand : json.outLand || false,
        before : json.before || function () {},
        after : json.after || function () {}
    };
    params.before();
    let url = "";
    //数据结构
    let fetchBody={
        credentials: 'include',  //http://xmth5.sit.ffan.com/
        method: params.type,
        headers: {
            'Accept' :'application/json,text/plain,*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'application/json;charset=utf-8'
        },
        mode: 'cors'
    };
    //交互方式以及传参方式
    if(params.type =="GET"){
        for (var i in params.param) {
            //如果是json,转成字符串
            if(Array.isArray(params.param[i])){
                //console.log(params.param[i])
                params.param[i] = JSON.stringify(params.param[i]);
            }
            //如果是json,转成字符串
            if(typeof(params.param[i]) == "object" && Object.prototype.toString.call(params.param[i]).toLowerCase() == "[object object]" && !params.param[i].length){
                params.param[i] = JSON.stringify(params.param[i]);
            }
        }
        url = (params.outLand ? "" : "http://api.ffan.com/") + params.path + paramType(params.param,"GET");
    }
    if(params.type =="POST"){
        url = (params.outLand ? "" : "http://api.ffan.com/") + params.path;
        let paramsString = paramType(params.param,"POST");
        fetchBody.body = paramsString;
    }
    return fetch(url,fetchBody)
        .then(response => response.json())
        .then(params.success)
        .then(params.after)
        .catch(error => console.log(error))

};


export {ajax}