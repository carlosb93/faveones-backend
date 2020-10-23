const db = require('_helpers/db');


module.exports = (io, socket) => {
	socket.on('send private message', async (msg) => {
		const emitterUser = await db.profile.findOne({ user_id: socket.id });
		const receiverUser = await db.profile.findOne({ user_id: msg.receiverId});

		const messageToReceiver = {
			emmiterSocketId: socket.id,
			emmiterId: emitterUser.user_id,
			receiverId: receiverUser.user_id,
			nickname: emitterUser.nick,
			message: msg.message,
		}

		const room = await db.Room.findOne({
			name: msg.room_name
		});
		const myrooms = await db.RoomUser.findAll({where:{user_id: emitterUser.user_id},attributes: ['room_id']});

		const roomuser = await db.RoomUser.findOne({where:{room_id:{[Op.in]:myrooms}, user_id:receiverUser.user_id}});
		 
		
	    const message = db.Chat.create({
			message: msg.message,
			sender_id: emitterUser.user_id,
			receiver_id: receiverUser.user_id,
			received: 0,
		});
        await message.save();

		if (roomuser) {
			io.in(room.id).clients((error, clients) => {
				// if user is not inside the room yet
				if (clients.every(x => String(x) !== String(receiverUser.user_id))) {
					// sending to individual socketid (private message)
					io.to(receiverUser.user_id).emit('receive private message', messageToReceiver);
				}
				// sending to all clients inside the room, including sender
				io.in(room.id).emit('receive private message', messageToReceiver);
			});
		}
	});
}