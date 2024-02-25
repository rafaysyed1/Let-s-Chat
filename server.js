const express = require('express')
const app = express();
const path = require('path')
const port = process.env.PORT || 4000
const server = app.listen(port, () => console.log(`Sever is running on port ${port}`))
const io = require('socket.io')(server)

let socketsConnected = new Set()

app.use(express.static(path.join(__dirname, 'public')))
io.on('connection', onConnected)


function onConnected(socket) {
    console.log(socket.id)
    socketsConnected.add(socket.id)
    io.emit('clientsTotal',socketsConnected.size)
    socket.on('disconnected',()=>{
        console.log("Socket Disconnected",socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clientsTotal',socketsConnected.size)
    })
}