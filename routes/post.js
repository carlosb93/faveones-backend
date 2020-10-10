const express = require('express');
const Post = require('../controllers/post.controller');
const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', Post.searchPosts);
router.post('/', authorize(), Post.newPost);
router.get('/page/:id', Post.getAll);
router.get('/mine',authorize(), Post.getAllMine);
router.get('/:id', authorize(), Post.getById);
router.put('/:id', authorize(), Post.updateSchema, Post.update);
router.delete('/:id', authorize(), Post._delete);

module.exports = router;