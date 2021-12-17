// 给为你推荐绑定事件实现点击变化数据
    // 先给前两个绑定事件
let forYouLi=getDomAll('.for_you_menu .for_tab_index');
let forYouA=getDomAll('.for_you_menu .for_tab_index a');
for(let i=0;i<=1;i++){
    forYouLi[i].onclick=()=>{
        forYouA.forEach(item=>{item.className=''});
        forYouA[i].className='for_you_current';
        getGoods(i+1);
        // console.log(i+1);
    }
}
// 请求数据添加到页面中
async function getGoods(num=1){

    let goodList=await Ajax.ajax({
        url:`myJd/js/goods${num}.json`,
        method:'get',
        data:{}
    });

    // console.log(goodList);
    // let img=getDom('.for_you_tab .for_you_goodslist li img');
    // img.src=goodList[0].src;
    let str='';
    goodList.forEach(item => {
        str+=`<li>
        <img src="${item.src}" alt=" ">
        <div class="goods_msg ">
            <h4 class="googs_title two_row ">
                <span class="ziying ">自营</span> ${item.name}
            </h4>
            <div class="price ">
                <i>￥</i><span>${item.price}</span><i>.00</i>
            </div>
            <div class="lookfor_sim ">
                <div class="xiangsi" onclick="addToCart(${item.id},1)">加入购物车</div>
            </div>
        </div>
    </li>`
    let ul=getDom('.for_you_tab .for_you_goodslist');
    ul.innerHTML='';
    ul.innerHTML=str;
    });
}

getGoods();
// function getGoods(){
//     return axios.get('http://localhost:3000/goods');
// }
// let goods=getGoods();
// console.log(goods);

// 点击加入购物车将内容添加到local中
let cartGoods={};
function addToCart(gId,num){
    let cart=localStorage.getItem('cart');
    if(cart){
        cart=JSON.parse(cart);
        // console.log(cart);
        // console.log(cart[gId]);
        if(cart[gId]){
            for (let attr in cart) { 
                attr == gId && (num = num + cart[attr]);
              }

            cart[gId]=num;
            localStorage.setItem('cart',JSON.stringify(cart));
        }else{
            // console.log(123);
            cartGoods[gId]=num;
            localStorage.setItem('cart',JSON.stringify(cartGoods));
        }
    }else{
        cartGoods[gId]=num;
        localStorage.setItem('cart',JSON.stringify(cartGoods));
    }

    showCartNum()
}
// 购物车左上角显示数字
function showCartNum(){
    // 在哪显示
    let divNum=getDom('.shop_car .num');
    let cart=localStorage.getItem('cart');
    let num=0;
    if(cart){
        cart=JSON.parse(cart);
        for(let i in cart){
            num+=cart[i];
        }
        divNum.innerHTML=num;
    }else{
        divNum.innerHTML=0
    }
}
showCartNum();
function getDom(ele){
    return document.querySelector(ele);
}
function getDomAll(ele){
    return document.querySelectorAll(ele);
}