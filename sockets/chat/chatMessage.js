const db = require('_helpers/db');

module.exports = (io, socket) => {
    socket.on('chat message', async (msg) => {
        const user = await db.Profile.findOne({ user_id: socket.id });

        io.emit('chat message', { nickname: user.nick, message: msg.message });
    });
}

