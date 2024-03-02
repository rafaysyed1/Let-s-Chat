const socket = io();

const clientsTotal = document.getElementById('cleintsTotal')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('nameInput')
const messageForm = document.getElementById('messageForm')
const messageInput = document.getElementById('messageInput')

const messageTone = new Audio('/whistle.mp3')

messageForm.addEventListener('submit', (e) => {
   e.preventDefault()
   sendMessage()
})

socket.on('clientsTotal', (data) => {
   clientsTotal.innerHTML = `Total Clients : ${data}`
})

function sendMessage() {
   if (messageInput.value == '') {
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

function addMessagetoChat(isOwnerMessage, data) {
   //Check for only playing sound on recieving a message not on sending
   if (!isOwnerMessage) {
      messageTone.play(); 
  }
  // Logic to have name as 'you' when a person sends the message
  if(isOwnerMessage){
   data.name = 'You'
  }
   clearFeedback()
   const messageElement = `<li class="${isOwnerMessage ? "messageRight" : "messageLeft"}">
   <p class="message">${data.message}
       <span>${data.name}. ${moment(data.dateTime).fromNow()}</span>
   </p>
  
</li>`
   messageContainer.innerHTML += messageElement
   scrollToBottom()
}

function scrollToBottom() {
   messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

// Event listener for message input
messageInput.addEventListener('input', (e) => {
   if (messageInput.value.length > 50) {
      console.log(`${nameInput.value} is typing a long message...`);
      socket.emit('feedback', {
         feedback: `${nameInput.value} is typing a long message...`
      });
   } else if (messageInput.value !== "") {
      console.log(`${nameInput.value} is typing a message...`);
      socket.emit('feedback', {
         feedback: `${nameInput.value} is typing a message...`
      });
   } else {
      console.log(`Ahh.. ${nameInput.value} is confused...`);
      socket.emit('feedback', {
         feedback: `Ah...${nameInput.value} is confused...`
      });
   }
});

// Event listeners for message input
messageInput.addEventListener('focus', (e) => {
   console.log('Focus event triggered');
   socket.emit('feedback', {
      feedback: `${nameInput.value} is typing a message`
   });
});
messageInput.addEventListener('blur', (e) => {
   console.log("Blur event triggered")
   socket.emit('feedback', {
      feedback: `${nameInput.value} is online`
   });
});








socket.on('feedback', (data) => {
   clearFeedback()
   const feedbackElement = `<li class="messageFeedback">
   <p class="feedback" id="feedback">${data.feedback}</p>
</li>`

   messageContainer.innerHTML += feedbackElement
})

function clearFeedback (){
   document.querySelectorAll('li.messageFeedback').forEach(element =>{
      element.parentNode.removeChild(element)
   })
}