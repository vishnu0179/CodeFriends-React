const express = require('express')
var app = express();

const cors = require('cors')
const auth = require('./routes/auth')
const user = require('./routes/user')

const io = require('socket.io')(5000)

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use('/auth', auth)
app.use('/user', user)

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id)
    //console.log(id);

    socket.on('send-message', ({recipients, payload, type}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter( r => r !== recipient)
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients : newRecipients,
                sender: id, 
                payload,
                type
            })
        })
    })
})


app.listen(port, ()=>{
    console.log("server listening at port", port)
})
