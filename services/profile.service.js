const db = require('_helpers/db');
const paginate = require('jw-paginate');
const {Op} = require('sequelize');
const _ = require('lodash');




module.exports = {
    get,
    update
};

async function get(req) {
    
    profile = await db.Profile.findOne({where:{ user_id: req.user.id}, include: ['user']});

    return profile;
}


async function update(req) {
    const profile = await getProfile(req.user.id);
    const user = await getUser(req.user.id);
    params = req.body;

    if(!req.files) {
        
    }else{
        let avatar = req.files.avatar;
            
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv('../uploads/' + user.id +'-'+ user.email +'/avatar/image-'+ avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                url: '../uploads/' + user.id +'-'+ user.email +'/avatar/image-'+ avatar.name,
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        });

        
        params.avatar = JSON.stringify(data);
    }

    // Validando
    const nickChanged = params.nick && profile.nick !== params.nick;
    if (nickChanged && await db.Profile.findOne({ where: { nick: params.nick } })) {
        throw 'Nickname: "' + params.nick + '" is already in use';
    }

    const emailChanged = params.email && profile.email !== params.email;
    if (emailChanged && await db.Profile.findOne({ where: { email: params.email } })) {
        throw 'Email: "' + params.email + '" is already in use';
    }
    await db.RoomUser.create(
        {
            room_id: 1,
            user_id: user.id 
        }
    );
    // Actualizar parametros y guardar
    Object.assign(profile, params);
    await profile.save();

    return profile;
}


// Funciones de ayuda

async function getProfile(id) {
    const profile = await db.Profile.findOne({where:{ user_id: id}, include: ['user','zodiac']});
    if (!profile) throw 'Profile not found';
    return profile;
}


async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}


