const express = require('express');
const router = express.Router();
const commentService = require('../services/comment.service');

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', async (req, res,next) =>  {
    commentService.getAllCommentsFromPost(req)
        .then(comments => res.json(comments))
        .catch(next);
});
 //http://localhost:4000/api/comments?post=cuba&page=1
module.exports = router;