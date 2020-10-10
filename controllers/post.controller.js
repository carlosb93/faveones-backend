const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const postService = require('../services/post.service');



exports.getAll = async (req, res,next) =>  {
    postService.getAll(req.params.id)
        .then(posts => res.json(posts))
        .catch(next);
}
exports.getAllMine = async (req, res,next) =>  {
    postService.getAllMine(req.user,req)
        .then(posts => res.json(posts))
        .catch(next);
}

exports.searchPosts = async (req, res,next) =>  {
    postService.searchPosts(req)
        .then(posts => res.json(posts))
        .catch(next);
}

exports.newPost = async (req, res,next) =>  {
    postService.newPost(req.body,req.user,req,res)
        .then(() => res.json({ message: 'Successfully created' }))
        .catch(next);
}


exports.getById = async (req, res,next) =>  {
    postService.getById(req.params.id)
        .then(post => res.json(post))
        .catch(next);
}

exports.updateSchema = async (req, res,next) =>  {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        content: Joi.string().empty(''),
        image: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

exports.update = async (req, res,next) =>  {
    postService.update(req.params.id, req.body)
        .then(post => res.json(post))
        .catch(next);
}


exports._delete = async (req, res,next) =>  {
    postService.delete(req.params.id)
        .then(() => res.json({ message: 'Post eliminated successfully' }))
        .catch(next);
}