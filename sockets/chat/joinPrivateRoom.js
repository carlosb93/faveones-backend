const db = require('_helpers/db');

module.exports = (io, socket) => {
	socket.on('join private room', async (data) => {
		const emitterUser = await db.Profile.findOne({ user_id: socket.id });
		const receiverUser = await db.Profile.findById(data.receiverId);

		const alreadyInRoom = await db.Room.find({
			name: 'private'+ socket.id +'-'+ data.receiverId,
		});

		if (alreadyInRoom[0] != undefined) {
			io.in(alreadyInRoom.id).clients((error, clients) => {
				// if user is not inside the room yet
				if (clients.every(x => String(x) !== String(socket.id))) {
					socket.join(alreadyInRoom.id);
				}
			});
		} else {
			const newRoom = db.Room.create({
			            	name: 'private'+ emitterUser.user_id +'-'+ receiverUser.user_id,
							description: 'Private Group',
							owner_id: emitterUser.user_id,
			            });
			await newRoom.save();

			const newuser = db.RoomUser.create({
							user_id: emitterUser.user_id,
							room_id: newRoom.id,
			            	room_status: 'online',
						});
			await newuser.save();

			const newinvite = db.RoomUser.create({
							user_id: receiverUser.user_id,
							room_id: newRoom.id,
			            	room_status: 'online',
			            });
			await newinvite.save();

			socket.join(newRoom.id);
		}
	});
}