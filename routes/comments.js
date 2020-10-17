const express = require('express');
const Comment = require('../controllers/comment.controller');
// const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/page/:id', Comment.getAllCommentsFromPost);

module.exports = router;