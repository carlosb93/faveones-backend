const db = require('_helpers/db');

module.exports = (io, socket) => {
    socket.on('disconnect', async (data) => {
		const userToRemove = await db.RoomUser.findOne({ user_id: socket.id, room_id: data.room_id });
        userToRemove.room_status = 'offline';
        await userToRemove.save();

        io.emit('disconnected user', { user_id: userToRemove.user_id });
    });
}