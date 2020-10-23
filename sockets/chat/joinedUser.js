const db = require('_helpers/db');

module.exports = (io, socket) => {
	socket.on('join user', async (data) => {
		// add user to db
		const onlineUser = new db.RoomUser({ user_id: socket.id, room_id: data.room_id });
		onlineUser = 'offline';
		await onlineUser.save();

		// get online users
		const onlineUsers = await db.RoomUser.findAll({room_id: data.room_id, room_status:'online',attributes:['user_id'],include:['user','room']});

		// send to current request socket client
		socket.emit('user joined', {
			onlineUsers,
		});

		// sending to all clients except sender
		socket.broadcast.emit('new online user', onlineUser);
	});
}