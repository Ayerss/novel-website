function requestPost(url, data = {}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

//读取cookies
function getCookie(name){
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg)
  if(arr)
    return unescape(arr[2]);
  else
    return null;
}

function setCookie(name, value){
  const exp = new Date();
  exp.setTime(exp.getTime() + 24*60*60*1000);
  document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString();
}

function getId() {
  let id = getCookie('socketId');
  if(!id){
    id = Math.random().toString(16).slice(2);
    setCookie('socketId', id);
  }
  return id;
}
function ws() {
  const socketId = getId();
  const socket = window.io('ws://localhost:3000');
  socket.emit('conn', socketId);
  socket.on('conn', (msg) => {
    console.log(msg);
  });

  return socket;
}
