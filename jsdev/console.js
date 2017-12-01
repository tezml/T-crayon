import {ajax} from "./variable.js"

// const json = {
//     "keyword1": {
//         "value": "339208499",
//         "color": "#173177"
//     },
//     "keyword2": {
//         "value": "2015年01月05日 12:30",
//         "color": "#173177"
//     },
//     "keyword3": {
//         "value": "粤海喜来登酒店",
//         "color": "#173177"
//     } ,
//     "keyword4": {
//         "value": "广州市天河区天河路208号",
//         "color": "#173177"
//     }
// };

ajax({
    path: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=eSb2kazI87LGzOwZPrk-v36vrmmzBANG1BmkiyQUwM0_8-RyjrUX8ns0d2j_sLura-Mqqea_3IcKjl9N6L6zslL784qDdXtAASJMnLqhKpgPedAxoopY5XEOI0OBvUa_LADfAGABQT',
    param: {
        template_id:"1Lc-qNxPp2cefHUA1js04gXfRzS6MJUCwAO5cLrW9WU",
        touser:"ozEAf0UooMDRQwx-DPb_PB0W87x8",
        form_id:"c9df4efc3bd5fd8a7c870593d29b5b0b",
        data:json
    },
    cache:true,
    // timeout:1000,
    // type:"POST",
    // cacheSize:1,
    before: () => {

    },
    fail:(res) =>{
        console.log(res)
    },
    success: (res) => {
    }
});










