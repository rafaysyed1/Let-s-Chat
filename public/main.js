const socket = io();

const clientsTotal = document.getElementById('cleintsTotal')

socket.on('clientsTotal',(data)=>{
   clientsTotal.innerHTML = `Total Clients : ${data}`
})
