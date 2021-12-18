async function send(){
    let res=await axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: {
          username: '王五',
          password: '1234'
        }
      });
      console.log(res);
}
// send()