const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const userService = require('../services/user.service');





exports.authenticateSchema = async (req, res,next) =>  {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.authenticate = async (req, res,next) =>  {
    userService.authenticate(req.body,res)
        .then(user => res.json(user))
        .catch(next);
}

exports.registerSchema = async (req, res,next) =>  {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

exports.register = async (req, res,next) =>  {
    userService.create(req.body)
        .then(() => res.json({ message: 'User registered successfully' }))
        .catch(next);
}

exports.getAll = async (req, res,next) =>  {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

exports.getCurrent = async (req, res,next) =>  {
    console.log(req.user);
    res.json(req.user);
}

exports.getById = async (req, res,next) =>  {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

exports.updateSchema = async (req, res,next) =>  {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

exports.update = async (req, res,next) =>  {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports.resetPassword = async (req, res,next) =>  {
    userService.resetPassword(req.params.token, req.body, res)
        .then(() => res.json({ message: 'Password changed successfully!!' }))
        .catch(next);
}

exports.reset = async (req, res,next) =>  {
    userService.reset(req.params.token, res)
        .then(user => res.json(user))
        .catch(next);
}

exports.verifyUser = async (req, res,next) =>  {
    userService.verifyUser(req.params.id)
        .then(() => res.json({ message: 'User verified, proceed to login page' }))
        .catch(next);
}

exports.recover = async (req, res,next) =>  {
    userService.recover(req.body)
        .then(() => res.json({ message: 'A reset email has been sent to: ' + req.params.email + '.'}))
        .catch(next);
}

exports._delete = async (req, res,next) =>  {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User eliminated successfully' }))
        .catch(next);
}