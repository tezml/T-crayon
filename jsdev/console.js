import {ajax} from "./variable.js"
ajax({
    path: 'wechatxmt/v1/userCard/memberInfo',
    param: {
        relationId:11
    },
    before: () => {

    },
    after: () => {

    },
    success: (res) => {
        if(res.status == 200){

        }
    }
})

