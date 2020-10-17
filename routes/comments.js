const express = require('express');
const Comment = require('../controllers/comment.controller');
// const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', Comment.getAllCommentsFromPost);
 //http://localhost:4000/api/comments?post=cuba&page=1
module.exports = router;