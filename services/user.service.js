// const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const crypto = require('crypto');
// var mail = require('../utils/mailer');
// const path = require('path');
// var fs = require('fs');
// var Handlebars = require('handlebars');

var sendRecoverEmail = require('../mailers/sendRecoverEmail');
var sendVerificationEmail = require('../mailers/sendVerificationEmail');
var sendPasswordConfirmationEmail = require('../mailers/sendPasswordConfirmationEmail');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    verifyUser,
    update,
    resetPassword,
    reset,
    recover,
    delete: _delete
};

async function authenticate({ email, password }, res) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(200).json({message: 'Incorrect username or password'});
        // throw 'Incorrect username or password';
    }
        

    // Autenticado correctamente
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' }); // tiempo de validez 7 dias
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params,res) {
    // Validacion
    if (await db.User.findOne({ where: { username: params.username } })) {
        // throw 'User name: "' + params.username + '" is already in use';
        return res.status(200).json({message: 'User name: "' + params.username + '" is already in use'});
    }

    if (await db.User.findOne({ where: { email: params.email } })) {
        // throw 'Email: "' + params.email + '" is already in use';
        return res.status(200).json({message: 'Email: "' + params.email + '" is already in use'});
    }

    // Hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    params.isVerified = false;
    params.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    params.resetPasswordExpires = Date.now() + 3600000;

    try {

        sendVerificationEmail(params);


        console.log('Sending verification email to: ' + params.email);
        console.log(params.resetPasswordToken);

        // Guardando usuario
        await db.User.create(params);
        const email = params.email;
        const user = await db.User.findOne({ email });

        await db.Profile.create(
            {
                name: user.firstName,
                lastname: user.lastName,
                nick: user.username,
                email: user.email,
                // avatar: '',
                // address: '',
                // description: '',
                gender: 'M',
                zodiac_id: 1,
                user_id: user.id 
            }
        );

    } catch (error) {
        console.log(error)
        console.log('Error sending email');
    }
}

async function verifyUser(id) {
    const user = await getUserVerify(id);
     params = user;
    // Hash password si fue especificada
    if (!user.isVerified) {
        params.isVerified = true;
        params.resetPasswordToken = undefined;
        params.resetPasswordExpires = undefined;
    }

    // Actualizar parametros y guardar
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function update(id, params, res) {
    const user = await getUser(id);

    // Validando
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        // throw 'User name: "' + params.username + '" is already in use';
        return res.status(200).json({message: 'User name: "' + params.username + '" is already in use'});
        
    }

    // Hash password si fue especificada
    if (params.password) {
        params.password = await bcrypt.password(params.password, 10);
    }

    // Actualizar parametros y guardar
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function resetPassword(token, params, res) {
    const user = await getUserVerify(token);

    if (!user) return res.status(401).json({message: 'The password change token is invalid or has expired.'});
    

    if (params.password && params.password_confirmation) {
        user.password = await bcrypt.password(params.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;
    }

    await user.save();

    try {

        sendPasswordConfirmationEmail(user);


        console.log('Sending password change confirmation to: ' + user.email);


    } catch (error) {
        console.log(error)
        console.log('Error sending email');
    }
    
}

async function reset(token, res) {
    const user = await getUserVerify(token);

    if (!user) return res.status(401).json({message: 'The password change token is invalid or has expired.'});
    
    return res.status(200).json({message: token});
    
}

async function recover(params, res) {
    const { email } = params;

    const user = await db.User.findOne({ email });


    if (!user) return res.status(401).json({ message: 'The email: ' + email + ' it is not associated with any account. Please check the email and try again.'});

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save()
    

    try {

        sendRecoverEmail(user);


        console.log('Sending password recovery email to: ' + user.email);


    } catch (error) {
        console.log(error)
        console.log('Error sending email');
    }
    
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// Funciones de ayuda

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function getUserVerify(id) {
    const user = await db.User.findOne({ where: { resetPasswordToken: id, resetPasswordExpires: {$gt: Date.now()}} });
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}