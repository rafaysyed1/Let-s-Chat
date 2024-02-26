const socket = io();

const clientsTotal = document.getElementById('cleintsTotal')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('nameInput')
const messageForm = document.getElementById('messageForm')
const messageInput = document.getElementById('messageInput')

messageForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  sendMessage()
})

socket.on('clientsTotal',(data)=>{
   clientsTotal.innerHTML = `Total Clients : ${data}`
})

function sendMessage(){
   console.log(messageInput.value)
   const data = {
      name : nameInput.value,
      message : messageInput.value,
      dateTime : new Date()

   }
   socket.emit('message',data)

   
}
socket.on('chat-message', (data)=>{
    console.log(data)
})
