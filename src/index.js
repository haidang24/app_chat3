const path = require('path')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { readSync } = require('fs');
const io = new Server(server);
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('login')
})
//
app.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`${username} : ${password}`)
    if (username != '' && password != '') {
        app.get('/chat', (req, res) => {
            res.render('chat')
        })
        res.redirect('/Chat');
    } else {
        res.redirect('/');
    }
});

//
io.on('connection', (socket) => {
    socket.on('chat_message', ([data, minute, hours, Name]) => {
        socket.id = Name
        io.emit('chat_message', [data, minute, hours, socket.id])
    })
});
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})