// 添加购物车的数据到页面中
let divCart = document.querySelector('.shop_list');
// 获取购物车的数据
let cart = localStorage.getItem('cart');
console.log(cart);
// 获取所有商品，根据购物车的数据添加到页面中
async function getGoods() {
    // 展示商品总数据
    getCartNum();

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
        goodsList.forEach(item => {
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
            <div class="p-price">￥<span>${item.price}</span></div>
            <div class="p-num">
                <div class="quantity-form">
                    <a href="javascript:;" class="decrement" good-id="${item.id}">-</a>
                    <input type="text" class="itxt" value="${cart[item.id]}">
                    <a href="javascript:;" class="increment" good-id="${item.id}">+</a>
                </div>
            </div>
            <div class="p-sum">￥<span>${item.price * cart[item.id]}</span></div>
            <div class="p-action"><a href="javascript:;" class="p-action_x" good-id="${item.id}">删除</a><br>
        </div>
    </div>`
        })
        divCart.innerHTML = ''
        divCart.innerHTML = html;

        

        // 给核心模块绑定事件整事件委派，看点击的是什么执行相应的操作
        let contentBox = document.querySelector('.cart-warp');
        contentBox.onclick = e => {
            // 给全选按钮绑定事件实现全选和单选按钮选中或取消
        let checkAll = document.querySelectorAll('.c-container .checkall');
        let checkOne = document.querySelectorAll('.j-checkbox');
            getCartNum()
            console.log(e.target);
            if (e.target.className == 'checkall') {
                checkAllto(checkAll, checkOne, e.target.checked);
                getSum(checkOne)
            }
            // 点击+号增加数量，并将localstoryge更改
            if (e.target.className == 'increment') {
                addNum(e.target)
                getSum(checkOne)
            }//点击-号增加数量
            if (e.target.className == 'decrement') {
                delNum(e.target)
                getSum(checkOne)
            }

            if (e.target.className == 'j-checkbox') {
                // getSum(checkOne)
                // 点击单选让全选状态变化
                clickOne(checkOne, checkAll, e.target.checked)
                // 点击单选，计算金额和数量
                getSum(checkOne)
            }
            // 点击删除按钮，确认删除后，删除整行，并更改local
            if (e.target.className == 'p-action_x') {
                delLine(e.target);
                getSum(checkOne)
            }
            // 点击清空购物车，删除所有商品
            if (e.target.className == 'clear-all') {
                delLine(e.target);
                getSum(checkOne)
            }
            // 点击清除已选中，删除被选中的商品
            if (e.target.className == 'remove-batch') {
                delLine(e.target,checkOne);
                // getSum(checkOne)
            }
        }



    }
}


getGoods()

// 实现全选按钮
function checkAllto(checkAll, checkOne, status) {
    checkAll.forEach(item => {
        item.checked = status;
    })
    checkOne.forEach(item => {
        item.checked = status;
    })
}
// 点击单选改变全选的状态
function clickOne(checkOne, checkAll, status) {
    if (!status) {
        checkAll.forEach(item => { item.checked = false })
    } else {
        let sta = Array.from(checkOne).some(item => { return !item.checked })
        !sta && checkAll.forEach(item => { item.checked = true })
    }
}

// 点击+号增加数量，并将localstoryge更改
function addNum(target) {
    // 当前target为a标签
    let numNode = target.previousElementSibling;
    numNode.value = numNode.value - 0 + 1;
    // 改变价格
    let price = target.parentNode.parentNode.nextElementSibling.children[0];
    price.innerHTML = numNode.value * target.parentNode.parentNode.previousElementSibling.children[0].innerHTML;
    // 获取id去改变local
    let id = target.getAttribute('good-id');
    let cart = getLocal();
    cart[id] = numNode.value;
    setLocal(cart);
}
function delNum(target) {
    // 当前target为a标签
    let numNode = target.nextElementSibling;
    // 当数量为1时一直为1
    if (numNode.value == 1) {
        return
    }
    numNode.value = numNode.value - 0 - 1;
    // 改变价格
    let price = target.parentNode.parentNode.nextElementSibling.children[0];
    price.innerHTML = numNode.value * target.parentNode.parentNode.previousElementSibling.children[0].innerHTML;
    // 获取id去改变local
    let id = target.getAttribute('good-id');
    let cart = getLocal();
    cart[id] = numNode.value;
    setLocal(cart);
}
function getLocal() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    // 对象
    return cart;
}
function setLocal(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}
function delLocal(id){
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    delete cart[id];
    localStorage.setItem('cart', JSON.stringify(cart))
}
// 获取商品的总数量
function getCartNum(){
    let num=0;
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    for(let i in cart){
        num+=cart[i]
    }
    // 体现在页面中
    let boxNum=document.querySelector('.c-container .shop_count');
    boxNum.innerHTML=num;
}
// 单击全选，获取所有被选中的商品，获取数量
function getSum(checkOne) {
    // let checkOne=document.querySelectorAll('.j-checkbox');
    // 结算模块的总价和数量
    let sumPriceNode = document.querySelector('.cart-floatbar .price-sum span:nth-child(2)');
    // console.log(sumPriceNode);
    let sumNumNode = document.querySelector('.cart-floatbar .amount-sum span');
    // 
    let sumPrice = 0;
    let sunNum = 0;
    // console.log(sumNum);
    // 获取所有被选中的列表
    checkOne.forEach(item => {

        if (item.checked) {
            // console.log(item);
            let divLine = item.parentNode.parentNode;
            // 被选中的商品数量和小计
            let price = divLine.querySelector('.p-sum span').innerHTML - 0;
            let num = divLine.querySelector('.p-num input').value - 0;
            //累加 
            sumPrice += price;
            sunNum += num;
        }
    })
    sumPriceNode.innerHTML = sumPrice;
    sumNumNode.innerHTML = sunNum;
}

// 根据点击的选项，执行相应的删除操作
function delLine(tar,checkOne=null) {
    layer.open({
        title: '确认删除框', 
        content: '是否删除',
        btn: ['取消', '确认'],
        btn2: function () {
            //按钮【按钮二】的回调
            // console.log(tar);
            if(tar.className=='p-action_x'){
                let id=tar.getAttribute('good-id');
                tar.parentNode.parentNode.remove();
                delLocal(id);
            }
            if(tar.className=='clear-all'){
                divCart.innerHTML='';
                localStorage.removeItem('cart');
                // getSum(checkOne);
            }
            if(tar.className=='remove-batch'){
                checkOne.forEach(item=>{
                    if(item.checked){
                        let itemFather=item.parentNode.parentNode;
                        let id=itemFather.querySelector('.p-action_x').getAttribute('good-id');
                        itemFather.remove();
                        delLocal(id);
                        
                    }
                    
                });
                let sumPriceNode = document.querySelector('.cart-floatbar .price-sum span:nth-child(2)');
                // console.log(sumPriceNode);
                let sumNumNode = document.querySelector('.cart-floatbar .amount-sum span');
                sumPriceNode.innerHTML=0;
                sumNumNode.innerHTML=0;
                getSum(checkOne);
            }
        }
    });
}