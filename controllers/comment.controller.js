const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const commentService = require('../services/comment.service');



exports.getAll = async (req, res,next) =>  {
    commentService.getAll(req.params.id)
        .then(comments => res.json(comments))
        .catch(next);
}

exports.getAllCommentsFromPost = async (req, res,next) =>  {
    commentService.getAllCommentsFromPost(req)
        .then(comments => res.json(comments))
        .catch(next);
}

exports.getAllMine = async (req, res,next) =>  {
    commentService.getAllMine(req.user,req)
        .then(comments => res.json(comments))
        .catch(next);
}

exports.searchComments = async (req, res,next) =>  {
    commentService.searchComments(req)
        .then(comments => res.json(comments))
        .catch(next);
}

exports.newComment = async (req, res,next) =>  {
    commentService.newComment(req.body,req.user,req,res)
        .then(() => res.json({ message: 'Successfully created' }))
        .catch(next);
}


exports.getById = async (req, res,next) =>  {
    commentService.getById(req.params.id)
        .then(comment => res.json(comment))
        .catch(next);
}

exports.updateSchema = async (req, res,next) =>  {
    const schema = Joi.object({
        content: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

exports.update = async (req, res,next) =>  {
    commentService.update(req.params.id, req.body)
        .then(comment => res.json(comment))
        .catch(next);
}


exports._delete = async (req, res,next) =>  {
    commentService.delete(req.params.id)
        .then(() => res.json({ message: 'Comment eliminated successfully' }))
        .catch(next);
}