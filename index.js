const express = require('express')
const app = express()
const path = require('path')
const socketIo = require('socket.io')
const PORT = 8000

app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT, () => {
    console.log('Running on port:' + PORT)
})

const messages = []
const io = socketIo(server)

io.on('connection', (socket) => {
    socket.emit('update_messages', messages)
    // console.log(socket.id)
    socket.on('new_message', (data) => {
        messages.push(data)
        io.emit('update_messages', messages)
    })
})