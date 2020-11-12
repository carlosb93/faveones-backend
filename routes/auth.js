const router = express.Router();
const express = require('express');
const {check} = require('express-validator');
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const userService = require('../services/user.service');
const validateRequest = require('_middleware/validate-request');

// Rutas

router.post('/authenticate', async (req, res ,next) => {
    const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
    }); validateRequest(req, next, schema); }, async (req, res,next) =>  {
    userService.authenticate(req.body,res)
        .then(user => res.json(user))
        .catch(next);
});

router.get('/logout', authorize(), async (req, res,next) =>  {
    userService.logout(req,res)
        .then(() => res.json({ message: 'Logout successfully!!' }))
        .catch(next);
});


router.post('/register', async (req, res,next) =>  {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}, async (req, res,next) =>  {
    userService.create(req.body)
        .then(() => res.json({ message: 'User registered successfully' }))
        .catch(next);
});


router.get('/verify/:id', async (req, res,next) =>  {
    userService.verifyUser(req.params.id)
        .then(() => res.json({ message: 'User verified, proceed to login page' }))
        .catch(next);
});

router.post('/recover',[
    check('email').isEmail().withMessage('Enter a valid email address'),
                       ], async (req, res,next) =>  {
                        userService.recover(req.body).then(() => res.json({ message: 'A reset email has been sent to: ' + req.params.email + '.'})).catch(next);
           });


router.get('/reset/:token', async (req, res,next) =>  {
    userService.reset(req.params.token, res)
        .then(user => res.json(user))
        .catch(next);
});



router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('password_confirmation', 'Confirmation password should be the same as your password').custom((value, {req}) => (value === req.body.password)),
], async (req, res,next) =>  {
    userService.resetPassword(req.params.token, req.body, res)
        .then(() => res.json({ message: 'Password changed successfully!!' }))
        .catch(next);
});

module.exports = router;