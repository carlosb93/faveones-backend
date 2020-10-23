const db = require('_helpers/db');

module.exports = (io, socket) => {
	socket.on('create room', async (data) => {
		const emitterUser = await db.Profile.findOne({ user_id: socket.id });

		const alreadyInRoom = await db.Room.find({
			name: data.name,
		});

		if (alreadyInRoom[0] != undefined) {
			socket.emit('Room with that name already exists');
		} else {
			const newRoom = db.Room.create({
			            	name: data.name,
							description: data.description,
							owner_id: socket.id,
			            });
			await newRoom.save();

			const newuser = db.RoomUser.create({
							user_id: emitterUser.user_id,
							room_id: newRoom.id,
			            	room_status: 'online',
						});
			await newuser.save();

			socket.join(newRoom.id);
		}
	});
}