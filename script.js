// 简易欢迎语示例
document.addEventListener('DOMContentLoaded',()=>{
  const greet=document.getElementById('greeting');
  const hours=new Date().getHours();
  let text='Welcome back, 宝宝';
  if(hours>=18)text='晚上好，宝宝';
  else if(hours>=12)text='下午好，宝宝';
  else text='早上好，宝宝';
  greet.textContent=text;
});
