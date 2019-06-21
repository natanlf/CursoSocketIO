const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

//SOCKETIO RECEBE O SERVIDOR EXPRESS
const io = socketio(expressServer);
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        //io.emit('messageToClients',{text:msg.text})
        io.of('/').emit('messageToClients',{text:msg.text}) // .of('/') emitimos para um namespace, quando colocamos apenas a barra é o namespace raiz
    })

    setTimeout(()=>{ //a mensagem só enviada por causa do delay de 2 segundos, pois não é possível emitir pelo namespace admin porque a conexão não foi feita, após 2 segundos a conexão foi feita
        io.of('/admin').emit('welcome', "Welcome to the admin channel, from the main channel!")
    }, 2000)
    
})

io.of('/admin').on('connection',(socket)=>{ //permite conexão com o namespace admin
    console.log("Someone connected to the admin namespace!")
    io.of('/admin').emit('welcome', "Welcome to the admin channel!")
})

