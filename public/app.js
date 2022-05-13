// const socket = io('http://localhost:8080');
const socket = io(window.location.href);

let fromId = toId = ''
document.getElementById('btnFromId').onclick = () => {
  fromId = document.getElementById('fromId').value
  if (fromId === '')
    alert("ID cannot be blank")
  else
    socket.emit('connect-user', fromId)
}
document.getElementById('btnToId').onclick = () => {
  toId = document.getElementById('toId').value
  if (toId === '')
    alert("ID cannot be blank")
  console.log(toId);
}

const displayMessage = (sender, body) => {
  const el = document.createElement("li");
  el.innerHTML = `<div class="user">${sender}</div><div class="text">${body}</div>`;
  el.classList.add("chat")
  const ul = document.querySelector("ul");
  ul.appendChild(el);
  ul.lastChild.scrollIntoView();
}
document.getElementById('btnSend').onclick = () => {
  const msgint = document.getElementById('msg');
  const message = {
    body: msgint.value,
    receiver: toId,
    sender: fromId
  }
  if (message.body !== '' && toId !== '' && fromId !== '') {
    msgint.value = ''
    socket.emit('message', message);
    displayMessage('You', message.body)
    msgint.focus();
  } else if (message.body !== '')
    alert("ID cannot be blank")
}
document.getElementById('msg').addEventListener("keyup", (event, callback) => {
  if (event.key == 'Enter') {
    document.getElementById('btnSend').click()
  }
  callback('Enter')
})

socket.on('message', (message) => {
  displayMessage(message.sender, message.body)
})
