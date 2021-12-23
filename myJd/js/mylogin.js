// 获取用户名和密码输入框
let inputs=document.querySelectorAll('.zhanghu input');
// 获取用户名和密码框的提示
let uTip=document.querySelector('.zhanghu .uTip');
let pTip=document.querySelector('.zhanghu .pTip');
// console.log(pTip,uTip);

// 输入用户名的时候就可以判断当前用户是否注册
inputs[0].onblur=()=>{
    let username=getUname(inputs[0].value);
    // console.log(username);
    username.then(data=>{
        console.log(data.data.length);
        if(data.data.length==0){
            uTip.innerHTML='该用户未注册，请检查'
            uTip.style.color='red';
            // loginBtn.onclick='none';
        }else{
            uTip.innerHTML=''
        }
    })
}
// console.log(123);
// 获取登录按钮
let loginBtn=document.querySelector('.zhanghu .login');
loginBtn.onclick=()=>{
    // 判断一下，用户未注册，输入为空，都不能执行
    if( uTip.innerHTML=='该用户未注册，请检查' || inputs[0].value.trim()=='' || inputs[1].value.trim()==''){
        // console.log(312);
        return
    }
    console.log(123);
    // 获取输入框的值，发送查询请求
    let user=getUser(inputs[0].value,inputs[1].value);
    // console.log(username);
    user.then(data=>{
        // console.log(data);
        if(data.data.length==0){
            uTip.innerHTML='账户或用户名错误';
            return;
        }else{
            uTip.innerHTML=''
            localStorage.setItem('user',inputs[0].value);
            location.href='./index.html'
        }
    })
}

// 获取数据的一些方法
// 获取用户名
function getUname(username) {
    return axios({
      method: 'get',
      url: `http://localhost:3000/users?username=${username}`
    });
  
}
// 获取用户名和密码，有数据可以登录
function getUser(uName,pwd) {
    return axios({
      method: 'get',
      url: `http://localhost:3000/users?username=${uName}&password=${pwd}`
    });
  
}