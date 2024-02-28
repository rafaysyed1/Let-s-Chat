const socket = io();

const clientsTotal = document.getElementById('cleintsTotal')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('nameInput')
const messageForm = document.getElementById('messageForm')
const messageInput = document.getElementById('messageInput')

messageForm.addEventListener('submit', (e) => {
   e.preventDefault()
   sendMessage()
})

socket.on('clientsTotal', (data) => {
   clientsTotal.innerHTML = `Total Clients : ${data}`
})

function sendMessage() {
   if(messageInput.value == ''){
      return
   }
    
   console.log(messageInput.value)
   const data = {
      name: nameInput.value,
      message: messageInput.value,
      dateTime: new Date()

   }
   socket.emit('message', data)
   addMessagetoChat(true, data)
   messageInput.value = ''


}
socket.on('message', (data) => {
   console.log(data)
   addMessagetoChat(false, data)
})

function addMessagetoChat(isownerMessage, data) {
   const messageElement = `<li class="${isownerMessage ? "messageRight" : "messageLeft"}">
   <p class="message">${data.message}
       <span>${data.name}. ${moment(data.dateTime).fromNow()}</span>
   </p>
  
</li>`
   messageContainer.innerHTML += messageElement
   scrollToBottom()
}

function scrollToBottom (){
   messageContainer.scrollTo(0,messageContainer.scrollHeight)
}
