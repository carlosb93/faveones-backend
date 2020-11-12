const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const commentService = require('../services/comment.service');
const validateRequest = require('_middleware/validate-request');

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', async (req, res,next) =>  {
    commentService.searchComments(req)
        .then(comments => res.json(comments))
        .catch(next);
});

router.post('/', authorize(), async (req, res,next) =>  {
    commentService.newComment(req.body,req.user,req,res)
        .then(() => res.json({ message: 'Successfully created' }))
        .catch(next);
});

router.get('/page/:id', async (req, res,next) =>  {
    commentService.getAll(req.params.id)
        .then(comments => res.json(comments))
        .catch(next);
});


router.get('/mine',authorize(), async (req, res,next) =>  {
    commentService.getAllMine(req.user,req)
        .then(comments => res.json(comments))
        .catch(next);
});


router.get('/:id', authorize(), async (req, res,next) =>  {
    commentService.getById(req.params.id)
        .then(comment => res.json(comment))
        .catch(next);
});


router.put('/:id', authorize(), async (req, res,next) =>  {
    const schema = Joi.object({
        content: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}, async (req, res,next) =>  {
    commentService.update(req.params.id, req.body)
        .then(comment => res.json(comment))
        .catch(next);
});


router.delete('/:id', authorize(), async (req, res,next) =>  {
    commentService.delete(req.params.id)
        .then(() => res.json({ message: 'Comment eliminated successfully' }))
        .catch(next);
});

module.exports = router;