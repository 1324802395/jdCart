// 添加购物车的数据到页面中
let divCart = document.querySelector('.shop_list');
// 获取购物车的数据
let cart = localStorage.getItem('cart');
console.log(cart);
// 获取所有商品，根据购物车的数据添加到页面中
async function getGoods() {
    let html = '';
    let goodsList = await Ajax.ajax({
        url: 'myJd/js/allgoods.json',
        method: 'get',
        data: {}
    });
    if (cart) {
        cart = JSON.parse(cart);
        // 找出存在的数据
        goodsList = goodsList.filter(item => {
            return cart[item.id]
        });
        // console.log(goodsList);
        // check-cart-item 选中时的css样式
        goodsList.forEach(item=>{
            html += `<div class="cart-item check-cart-item">
            <div class="p-checkbox">
                <input type="checkbox" class="j-checkbox">
            </div>
            <div class="p-goods">
                <div class="p-img">
                    <img src="${item.src}" alt="">
                </div>
                <div class="p-msg two_row">${item.name}</div>
            </div>
            <div class="p-price">￥<span>999.00</span></div>
            <div class="p-num">
                <div class="quantity-form">
                    <a href="javascript:;" class="decrement">-</a>
                    <input type="text" class="itxt" value="${cart[item.id]}">
                    <a href="javascript:;" class="increment">+</a>
                </div>
            </div>
            <div class="p-sum">￥<span>${item.price}</span></div>
            <div class="p-action"><a href="javascript:;" class="p-action_x" good-id="${item.id}">删除</a><br>
        </div>
    </div>`
        })
        divCart.innerHTML=''
        divCart.innerHTML=html;


        
    }
    // console.log(goodsList);
}


getGoods()