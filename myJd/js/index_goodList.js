// const axios= require('axios');
const axios = require('axios');
// 请求数据添加到页面中
// async function getGoods(){
//     let goodList=await Ajax.ajax({
//         url:'myJd/js/goods.json',
//         method:'get',
//         data:{}
//     });
//     console.log(goodList);
//     let img=getDom('.for_you_tab .for_you_goodslist li img');
//     img.src=goodList[0].src;


// }
function getGoods(){
    return axios.get('http://localhost:3000/goods');
}
let goods=getGoods();
console.log(goods);

function getDom(ele){
    return document.querySelector(ele);
}
function getDomAll(ele){
    return document.querySelectorAll(ele);
}