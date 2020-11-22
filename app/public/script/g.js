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
