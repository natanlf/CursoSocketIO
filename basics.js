//USAMOS PORQUE NÃO TEMOS EXPRESS
const http = require('http')

//ACESSANDO MODULO DO SOCKETIO
const socketio = require('socket.io')

//HTTP SERVER COM NODE
const server = http.createServer((req, res)=>{
    res.end("Conectado")
})

const io = socketio(server)

io.on('connection', (socket, req)=>{
    //ENVIA PARA O CLIENTE
    socket.emit('welcome', 'Bem vindo ao websocket server')

    //RECEBE DO CLIENTE
    socket.on('message', (msg)=>{
        console.log(msg)
    })
})

server.listen(8000)