const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { getUser, singleUser, roomUsers, userLeave } = require('./utils/users')
const messageformat = require('./utils/messages')
app.use(cors());
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
// Socket.IO connection handling
io.on('connection', (socket) => {

    socket.on('join-room', ({ name, room }) => {

        const user = singleUser(socket.id, name, room)



        socket.join(user.room)

        socket.emit('message', messageformat(user.name, 'welocome to the room'))


        socket.broadcast.to(user.room).emit('message', messageformat('', `${user.name} has join the rommm`))

        //specific room users broadcast 

        io.to(user.room).emit('specificuser', {

            room: user.room,
            users: roomUsers(user.room)


        })



    })


    socket.on('chatmessage', (chat) => {  //chat users

        const user = getUser(socket.id)
        if (user) {

            io.to(user.room).emit('message', messageformat(user.name, chat))
        }
    })
    //user left room
    socket.on('disconnect', () => {

        const user = userLeave(socket.id)

        if (user) {

            io.to(user.room).emit('message', messageformat('', `${user.name} has left the room`))


            //get updated all users from specific room
            
            io.to(user.room).emit('specificuser', {

                room: user.room,
                users: roomUsers(user.room)


            })
        }
    })


})

server.listen('5000', () => {
    console.log("Server running on 5000");
});
