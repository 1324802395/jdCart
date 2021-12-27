// 给每个商品添加点击事件 事件委派
let ul=document.querySelector('.for_you_tab .for_you_goodslist');
ul.onclick=e=>{
    console.log(e.target);
    if(e.target.tagName=='IMG'){
        // console.log(123);
        let id=e.target.getAttribute('img-id');
        // console.log(id);
        // 存入local里
        localStorage.setItem('detail',id);
        // 跳转到详情页面
        location.href='./shop_goods.html'
    }
}