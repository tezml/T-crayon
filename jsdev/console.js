import {ajax} from "./variable.js"
ajax({
    path: 'http://api.ffan.com/wechatxmt/v1/plaza/floors',
    param: {
        plazaId:1,
        border:[1,2,3]
    },
    cache:true,
    timeout:1000,
    before: () => {

    },
    success: (res) => {

    }
});

ajax({
    path: 'http://api.ffan.com/wechatxmt/v1/plaza/floors',
    param: {
        plazaId:2,
        border:[1,2,3]
    },
    cache:true,
    timeout:1000,
    before: () => {

    },
    success: (res) => {

    }
});
ajax({
    path: 'http://api.ffan.com/wechatxmt/v1/plaza/floors',
    param: {
        plazaId:1,
        border:[1,2,3]
    },
    cache:true,
    timeout:1000,
    before: () => {

    },
    success: (res) => {

    }
});
ajax({
    path: 'http://api.ffan.com/wechatxmt/v1/plaza/floors',
    param: {
        plazaId:3,
        border:[1,2,3]
    },
    cache:true,
    timeout:1000,
    before: () => {

    },
    success: (res) => {

    }
});
setTimeout(function () {
    ajax({
        path: 'http://api.ffan.com/wechatxmt/v1/plaza/floors',
        param: {
            plazaId:1,
            border:[1,2,3]
        },
        cache:true,
        before: () => {

        },
        success: (res) => {
            console.log(res)

        },
        fail: (error) => {
            console.log(error)
        }
    });
},3000);