const express = require('express');
const authorize = require('_middleware/authorize')
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const postService = require('../services/post.service');

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', async (req, res, next) => {
    postService.searchPosts(req)
        .then(posts => res.json(posts))
        .catch(next);
});


router.post('/', authorize(), async (req, res, next) => {
    postService.newPost(req.body, req.user, req, res)
        .then(() => res.json({ message: 'Successfully created' }))
        .catch(next);
});


router.get('/page/:id', async (req, res, next) => {
    postService.getAll(req.params.id)
        .then(posts => res.json(posts))
        .catch(next);
});


router.get('/mine',authorize(), async (req, res, next) => {
    postService.getAllMine(req.user, req)
        .then(posts => res.json(posts))
        .catch(next);
}
);


router.get('/:id', authorize(), async (req, res, next) => {
    postService.getById(req.params.id)
        .then(post => res.json(post))
        .catch(next);
});


router.put('/:id', authorize(),  async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        content: Joi.string().empty(''),
        image: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}, async (req, res, next) => {
    postService.update(req.params.id, req.body)
        .then(post => res.json(post))
        .catch(next);
});


router.delete('/:id', authorize(), async (req, res, next) => {
    postService.delete(req.params.id)
        .then(() => res.json({ message: 'Post eliminated successfully' }))
        .catch(next);
});

module.exports = router;