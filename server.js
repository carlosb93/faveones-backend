require('dotenv').config();
require('rootpath')();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');


const server = require('http').Server(app);
const io = require('socket.io')(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});


/**
 * SOCKET
 */

io.on('connection', async (socket) => {
	require('./sockets/chat/joinedUser')(io, socket);
	require('./sockets/chat/chatMessage')(io, socket);
	require('./sockets/chat/disconnect')(io, socket);
	require('./sockets/chat/privateMessage')(io, socket);
	require('./sockets/chat/joinPrivateRoom')(io, socket);
});


app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Rutas del API 
require('./routes/index')(app);

// Manejador global de errores
app.use(errorHandler);



// Iniciar servidor
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3111;
app.listen(port, () => console.log('Server listening on port: ' + port));