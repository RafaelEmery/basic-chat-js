const express = require('express');
const path = require('path');

//Configurando o servidor e o protocolo
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Configurando as views e a engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Rota padrão
app.use('/', (req, res) => {
    res.render('index.html');
});

//Array para armazenar os objetos de mensagem
let messages = [];

//Websocket
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    //Pegando o evento do front
    socket.on('sendMessage', data => {
        messages.push(data);
        
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);