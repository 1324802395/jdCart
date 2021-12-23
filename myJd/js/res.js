// async function send(){
//     let res=await Ajax.ajax({
//         method: 'post',
//         url: 'http://localhost:3000/users',
//         data: {
//           username: '王五',
//           password: '1234'
//         }
//       });
//       console.log(res);
// }
// async function send() {
//   let res = await axios({
//     method: 'post',
//     url: 'http://localhost:3000/users',
//     data: {
//       username: '王五',
//       password: '1234'
//     }
//   });
// console.log(res);
function send(obj) {
  return axios({
    method: 'post',
    url: 'http://localhost:3000/users',
    data: obj
  });
}

// async function getUname(username){
//   let res=await axios({
//       method: 'get',
//       url: `http://localhost:3000/users?username=${username}`,
//       // data: {
//       //   // id:1
//       //   username:'张三'
//       // }
//     });
//     // console.log(res.data);
//     // if(res.data.length==0){
//     //   console.log('空');
//     // }
//     // return res
// }

// send()

function getUname(username) {
  return axios({
    method: 'get',
    url: `http://localhost:3000/users?username=${username}`,
  });

}




// 当用户尝试输入时，判断其用户名是否可用，并给出提示
let userInput = document.querySelector('form .username');
// 下方的提示信息 4个提示框 
let info = document.querySelectorAll('form .tip');
// 获取输入框 如果用户名重复，后续不能输入
let inputs = document.querySelectorAll('form input');

// let time = '';
// userInput.oninput = () => {
// // 设置定时器，为了实时判断用户输入的用户名是否存在
//   time = setInterval(function () {
//     let username = userInput.value;
//     let res=getUname(username);
//     // if(inputs[0].value==''){info[0].innerHTML='用户名不能为空'}

//     res.then(data=>{
//       if (data.data.length == 0) {
//         info[0].innerHTML = '用户名可用'
//         info[0].style.color = 'green';
//         // 如果用户名重复，后续不能输入
//         for(let i=1;i<inputs.length;i++){
//           inputs[i].disabled=false;
//         }
//       } else {
//         info[0].innerHTML = '用户名已存在，请修改'
//         info[0].style.color = 'red';
//         for(let i=1;i<inputs.length;i++){
//           inputs[i].disabled=true;
//         }
//       }
//     })
//     }, 1000)}

// userInput.onblur = () => {
//   clearInterval(time);
//   console.log(time);
// }

// 用户名的提示
inputs[0].onblur = () => {
  let username = userInput.value;
  let res = getUname(username);
  if (inputs[0].value == '') { 
    info[0].innerHTML = '用户名不能为空' ;
    info[0].style.color = '#ff9911';
  return} ;
  res.then(data => {
    if (data.data.length == 0) {
      info[0].innerHTML = '用户名可用'
      info[0].style.color = 'green';
      // 如果用户名重复，后续不能输入
      for (let i = 1; i < inputs.length; i++) {
        inputs[i].disabled = false;
      }
    } else {
      info[0].innerHTML = '用户名已存在，请修改'
      info[0].style.color = 'red';
      for (let i = 1; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
    }
  })
}

// 密码输入框的提示
inputs[1].onblur = () => {
  if (!inputs[1].value) { info[1].innerHTML = '密码不能为空'; return }
  else {
    info[1].innerHTML = '密码可用'
  }
  // inputs[2].onblur
}

// 当用户确认密码与密码不一样时给出提示
// 在确认密码输入框失去焦点时进行判断
inputs[2].onblur = () => {
  if (!inputs[2].value) { info[2].innerHTML = '确认密码不能为空'; return}
  if (inputs[2].value != inputs[1].value) {
    info[2].innerHTML = '确认密码不一致，请确认'
  } else {
    info[2].innerHTML = '确认密码一致'
  }
  inputs[1].onblur
}
// 邮箱验证
inputs[3].onblur = () => {
  if (!inputs[3].value) { info[3].innerHTML = '邮箱不能为空'; return }
  let res=/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
  if (!res.test(inputs[3].value)){
    info[3].innerHTML = '邮箱格式不正确，请重新输入';
  }else{
    info[3].innerHTML = '邮箱可用';
  }
}



// 点击注册去注册,获取输入框的值，通过ajax和json-server存入
let aBtn = document.querySelector('form button a');
// console.log(aBtn);
aBtn.onclick = () => {
  let obj = {};
  // 获取输入框的值
  if(!(info[0].innerHTML=='用户名可用'&&info[1].innerHTML=='密码可用'&&info[2].innerHTML=='确认密码一致'&&info[3].innerHTML=='邮箱可用')){
    return
  }else{
    obj["username"]=inputs[0].value;
    obj['password']=inputs[1].value;
    obj['email']=inputs[3].value;
    // 存入data
    let res=send(obj);
    // 可以弹出模态框，
    // 选择直接跳到登录界面
    res.then(()=>{
      // localStorage.setItem('username',inputs[0].value);
      window.location.href='./login.html'
    })
    
  }
}

function sendTest() {
  return axios({
    method: 'put',
    url: 'http://localhost:3000/users/5',
    data: {
      // id:1,
      username:'123456',
      password:1234,
      email:'1234@qq.qq'
    }
  });
}
// sendTest()

