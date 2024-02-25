const socket = io();

socket.on('clientsTotal',(data)=>{
   console.log(data)
})
