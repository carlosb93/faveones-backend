const express = require('express');
const Comment = require('../controllers/comment.controller');
const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', Comment.searchComments);
router.post('/', authorize(), Comment.newComment);
router.get('/page/:id', Comment.getAll);
router.get('/mine',authorize(), Comment.getAllMine);
router.get('/:id', authorize(), Comment.getById);
router.put('/:id', authorize(), Comment.updateSchema, Comment.update);
router.delete('/:id', authorize(), Comment._delete);

module.exports = router;