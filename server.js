require('dotenv').config();
require('rootpath')();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');


const server = require('http').Server(app);
const io = require('socket.io')(server)

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
const whitelist = ['http://localhost:3000',]; // here the other origins
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}

app.use(cors(corsOptions));
// app.use(function (req, res, next) { // trying to get large images posted
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next()
// })

// Manejador global de errores
app.use(errorHandler);

/**
 * SOCKET
 */
io.on('connection', (socket) => {
    // console.log('connection incoming!!!!!!!') // dev

    // require('./sockets/chat/joinedUser')(io, socket);
    require('./sockets/chat/chatMessage')(io, socket);
    // require('./sockets/chat/disconnect')(io, socket);
    // require('./sockets/chat/privateMessage')(io, socket);
    // require('./sockets/chat/joinPrivateRoom')(io, socket);

});

// set callbacks for feed
require('./sockets/feedANDcomments/feed').init({
    onPost: post => {
        io.emit('new post', post)
    }
})

// Rutas del API 
require('./routes/index')(app);


// Iniciar servidor
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3111;
server.listen(port, () => console.log('Server listening on port: ' + port));