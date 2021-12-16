// 给下方列表添加自定义属性，确定是哪张图片，让小图片和大图片都有相同的图片
// 获取所有数组对象
let midPic=document.querySelectorAll('.product_details .left .mid_photo>img');
// console.log(midPic);
let bigPic=document.querySelectorAll('.product_details .left .mid_photo .big_photo img');
// console.log(bigPic);
let li=document.querySelectorAll('.product_details .left .preview_list .list_item li');
// console.log(li);
// 添加自定义属性
let index=0;
li.forEach(item=>{item.setAttribute('index',index);index++});

// 移入下方列表哪张图片，哪张图片更改样式
let ul=document.querySelector('.product_details .list_item');
ul.onmouseover=e=>{
    // console.log(e.target);
    if(e.target.tagName=='IMG'){
        // 清除所有样式，给当前li设置className
        li.forEach(item=>{item.className=''})
        e.target.parentNode.className='tab_current'
        // console.log(e.target.parentNode);
        // 设置小图片框和大图片框为当前图片
        let index=e.target.parentNode.getAttribute('index');
        midPic.forEach(item=>{item.style.display='none'})
        bigPic.forEach(item=>{item.style.display='none';item.classList.remove('now')})
        midPic[index].style.display='block';
        bigPic[index].style.display='block';
        bigPic[index].classList.add('now');
    }
}


// 移入图片实现放大镜效果
let mid_photo=document.querySelector('.product_details .mid_photo');
let big_photo=document.querySelector('.product_details .mid_photo .big_photo');
let mask=document.querySelector('.product_details .mid_photo .mask');
    // 移入移出大图片和遮罩层出现和消失
mid_photo.onmouseover=()=>{
    big_photo.style.display='block';
    mask.style.display='block'
};
mid_photo.onmouseout=()=>{
    big_photo.style.display='none';
    mask.style.display='none'
}
    // 遮罩层移动改变大图片位置
        //遮罩层跟随鼠标位置且在中间
mid_photo.onmousemove=e=>{
    // console.log(e.clientX);
    let left=e.pageX-mid_photo.offsetLeft-parseInt(getComputedStyle(mask).width)/2;
    let top=e.pageY-mid_photo.offsetTop-parseInt(getComputedStyle(mask).height)/2;
    
    // 设置边界 
    // 左
    if(e.pageX<=mid_photo.offsetLeft+(parseInt(getComputedStyle(mask).width)/2)){
        left=0;
    }
    // 上
    if(e.pageY<=mid_photo.offsetTop+(parseInt(getComputedStyle(mask).height)/2)){
        top=0;
    }
    // 右
    if(e.pageX>=mid_photo.offsetLeft+(mid_photo.offsetWidth-(parseInt(getComputedStyle(mask).width)/2))){
        left=mid_photo.offsetWidth-(parseInt(getComputedStyle(mask).width));
    }
    // 下
    if(e.pageY>=mid_photo.offsetTop+mid_photo.offsetHeight-(parseInt(getComputedStyle(mask).height)/2)){
        top=mid_photo.offsetHeight-(parseInt(getComputedStyle(mask).height));
    }

    mask.style.left=left+'px';
    mask.style.top=top+'px';


    // 计算移动的比例
    // 大图片移动距离为可移动最大距离*比例
    let l=left/(mid_photo.offsetWidth-mask.offsetWidth);
    // console.log(l);
    let t=top/(mid_photo.offsetHeight-mask.offsetHeight);

    // 大图片移动 获取大图片
    let bp=document.querySelector(".big_photo .now");
    bp.style.left=-l*(800-540)+'px';
    bp.style.top=-t*(800-540)+'px';
    

}