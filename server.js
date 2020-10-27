require('dotenv').config();
require('rootpath')();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');


const server = require('http').Server(app);
const io = require('socket.io')(server);


/**
 * SOCKET
 */
io.set('origins', '*:*');
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
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port: ' + port));