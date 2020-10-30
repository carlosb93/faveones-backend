const db = require('_helpers/db');

module.exports = (io, socket) => { // basic repeater
    socket.on('chat message', async (msg) => {
        const user = await db.Profile.findOne({ user_id: socket.id });

        io.emit('chat message', { nickname: user.nick, senderId: user.user_id, message: msg });
    });
}

