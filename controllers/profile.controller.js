const Joi = require('joi');
const profileService = require('../services/profile.service');





exports.get = async (req, res,next) =>  {
    profileService.get(req)
        .then(profile => res.json(profile))
        .catch(next);
}

exports.update = async (req, res,next) =>  {
    profileService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}
