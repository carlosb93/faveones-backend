const express = require('express');
const authorize = require('_middleware/authorize')
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const userService = require('../services/user.service');

// Rutas
// ToDo cambiar a un fichero aparte

router.get('/', authorize(), async (req, res,next) =>  {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
});


router.get('/current', authorize(), async (req, res,next) =>  {
    console.log(req.user);
    res.json(req.user);
});

router.get('/:id', authorize(), async (req, res,next) =>  {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
});


router.put('/:id', authorize(), async (req, res,next) =>  {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}, async (req, res,next) =>  {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
});


router.delete('/:id', authorize(), async (req, res,next) =>  {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User eliminated successfully' }))
        .catch(next);
});

module.exports = router;