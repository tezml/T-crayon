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
        path : json.path || "",//ajax请求url
        param : json.param || {},//请求参数
        success : json.success || function () {},//调用成功回调函数
        saveData : json.saveData || function () {},//需要储存的数据
        type : json.type || "GET",//请求类型
        cache : json.cache || false,//是否读缓存
        before : json.before || function () {},//请求前回调函数
        fail : json.fail || function () {},//请求失败回调函数
        timeout : json.timeout || 0,//缓存过期时间
    };
    //执行ajax前的before
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
    //GET参数处理
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
        url =  params.path + paramType(params.param,"GET");
    }
    //POST参数处理
    if(params.type =="POST"){
        url =  params.path;
        let paramsString = paramType(params.param,"POST");
        fetchBody.body = paramsString;
    }


    //检验urlList里有没有这条url
    let saveUrl = false;
    let offset = null;
    crayon.urlList.forEach((item,i)=>{
        if(params.path + paramType(params.param,"GET") == item.url){
            saveUrl = true;
            offset = i;
        }
    });
    //如果有缓存读缓存,没有读接口
    if(params.cache && saveUrl){
        return  params.success(crayon.data[offset]);//回调success
    }else{
        return fetch(url,fetchBody)
            .then(response => response.json())
            .then((res) =>{
                const data = res;//params.saveData(res);//保存数据
                //如果urlList里没有这个url,那就把这个url塞进urllist,并把数据存进crayon的data
                if(!saveUrl){
                    crayon.urlList.push({url:params.path + paramType(params.param,"GET"),time:Date.parse(new Date())});
                    crayon.save(data,crayon.data.length);
                }
                //过期清理缓存
                if(params.timeout != 0){
                    setTimeout(()=>{
                        delete crayon.urlList[crayon.urlList.length-1];
                        delete crayon.data[crayon.data.length-1];
                    },params.timeout)
                }
                params.success(res);//回调success
            })
            .catch(error => params.fail(error))
    }
};
export const crayon = {};

crayon.data = [];
crayon.urlList = [];

crayon.save = (res,offset) =>{
    crayon.data[offset] = res;
    // console.log(crayon.data)
};











export {ajax,crayon}