let lBtn=document.querySelector('.btn_l');
let rBtn=document.querySelector('.btn_r');

// 所有li
let lis=document.querySelectorAll('.content li');
// console.log(lis);
// li的长度
let liLength=lis.length;
// 第一个li
let liFirst=lis[0];
// 最后一个li
let liLast=lis[liLength-1];

//给每个li加上个index
let i=0
lis.forEach(item=>{
  item.setAttribute('index',i);
  i+=1;
})

let num=0;
rBtn.onclick=()=>{
  lunbo()
}

function lunbo(){
  let liShow=document.querySelector('.show');
  // console.log(liShow);
  // 查找当前拥有show的li 给下一个li设置show 删除当前show 计数，到最后一个给第一个li设置show
  
  // console.log(num);
  if (num<liLength-1) {
    liShow.className='';
    liShow.nextElementSibling.className='show'
    num+=1;
  }else{
    num=0;
    lis.forEach(item=>{item.className=''})
    liFirst.className='show';
  }
  setActive()
}

// 实现自动轮播
let timer='';
timer=setInterval(lunbo,2000);
document.querySelector('.lunbotu').onmouseover=()=>{
  clearInterval(timer);
}
document.querySelector('.lunbotu').onmouseout=()=>{
  timer=setInterval(lunbo,2000);
}


lBtn.onclick=()=>{
  let liShow=document.querySelector('.show');
  // console.log(liShow);
  // 查找当前拥有show的li 给一个li设置show 删除当前show 计数，到最后一个给第一个li设置show
  console.log(num);
  if (num>0) {
    liShow.className='';
    liShow.previousElementSibling.className='show'
    num-=1;
  }else{
    num=liLength-1;
    lis.forEach(item=>{item.className=''})
    liLast.className='show';
  }
  setActive()
}

// 根据图片的数量创建下方的小圆圈
let ulCir=document.querySelector('.dotted');
for(let i=0;i<lis.length-1;i++){
  let li=document.createElement('li');
  ulCir.appendChild(li);
}

function setActive(){
  // 先清除样式
  let liCir=document.querySelectorAll('.dotted li');
  liCir.forEach(item=>{
    item.className=''
  });
  // 再给圆点设置样式，根据当前图片
  let nowPic=document.querySelector('.content .show');
  let index=nowPic.getAttribute('index');
  liCir[index].className='active';
}


// 设置倒计时
function time(){
  let endTime=new Date('2021-12-25 00:00:00').getTime();
  let nowTime=new Date().getTime();
  let time=parseInt((endTime-nowTime)/1000); //相差的秒数
  let allS=parseInt((endTime-nowTime)/1000)
  let day=contrast(parseInt(allS/3600/24))
  let hour=contrast(parseInt(allS/3600%24))
  let minute=contrast(parseInt(allS/60%60))
  let s=contrast(parseInt(allS%60))

  // 获取节点
  document.querySelector('#jd_miaosha .hour').innerHTML=hour;
  document.querySelector('#jd_miaosha .minute').innerHTML=minute;
  document.querySelector('#jd_miaosha .seconds').innerHTML=s;

}
time()
function contrast(num){
  return num<10?num=('0'+num):num;
}
setInterval(time,1000);