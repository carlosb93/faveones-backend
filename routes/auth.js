const express = require('express');
const Auth = require('../controllers/users.controller');
const router = express.Router();
const {check} = require('express-validator');
const authorize = require('_middleware/authorize')

// Rutas
router.post('/authenticate', Auth.authenticateSchema, Auth.authenticate);
router.get('/logout', authorize(), Auth.logout);
router.post('/register', Auth.registerSchema, Auth.register);
router.get('/verify/:id', Auth.verifyUser);
   //password
router.post('/recover',[
    check('email').isEmail().withMessage('Enter a valid email address'),
], Auth.recover);

router.get('/reset/:token', Auth.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('password_confirmation', 'Confirmation password should be the same as your password').custom((value, {req}) => (value === req.body.password)),
], Auth.resetPassword);

module.exports = router;