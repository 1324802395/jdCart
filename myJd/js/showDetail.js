// 获取当前被点击的商品id
let id=localStorage.getItem('detail');
console.log(id);
async function getImg(){
    let smallPicDate=await axios({
        method: 'get',
        url: `http://localhost:3001/smallPic?id=${id}`
      });
      let bigPicData=await axios({
        method: 'get',
        url: `http://localhost:3001/bigPic?id=${id}`
      });
    // console.log(smallPicDate,bigPic);
    // 获取到数据，渲染到页面
    // 将图片更换
    let midPic=document.querySelector('.product_details .left .mid_photo>img');
    // console.log(midPic);
    midPic.src=smallPicDate.data[0].src;
    // console.log(midPic.src);
    let bigPic=document.querySelector('.product_details .left .mid_photo .big_photo>img');
    bigPic.src=bigPicData.data[0].src;

    // 将名字渲染
    let name=document.querySelector('.right .goods_totle h2');
    name.innerHTML=bigPicData.data[0].name;
    // 渲染价格
    let price=document.querySelector('.right .price .count span');
    price.innerHTML=bigPicData.data[0].price;

    


}

    getImg()

// 点击抢购获取数量和id 存入local中
let qg=document.querySelector('.qianggou');
let num=document.querySelector('.qianggou .count')
qg.onclick=e=>{
    if(e.target.className=='add'){
        num.innerHTML=num.innerHTML-0+1;
    }
    if(e.target.className=='minus'){
        num.innerHTML=num.innerHTML-0-1;
        if(num.innerHTML<1){
            num.innerHTML=1
        }
    }
    if(e.target.tagName=='H2'){
        // console.log(123);

        addToCart(id,num.innerHTML-0);
    }
}

function addToCart(gId,num){
    // let state=isLogin();
    // if(!state){
    //     location.href='./login.html'
    // }else{
        let cart=localStorage.getItem('cart');
        console.log(cart);
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
                console.log('bugbug');
                cartGoods[gId]=num;
                localStorage.setItem('cart',JSON.stringify(cartGoods));
            }
        }else{
            cartGoods[gId]=num;
            localStorage.setItem('cart',JSON.stringify(cartGoods));
            // console.log('bug');
        }
    
        // };
    
}

