const express = require('express');
const authorize = require('_middleware/authorize')
const router = express.Router();
const profileService = require('../services/profile.service');



// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', authorize(), async (req, res,next) =>  {
    profileService.get(req)
        .then(profile => res.json(profile))
        .catch(next);
});


router.put('/', authorize(), async (req, res,next) =>  {
    profileService.update(req)
        .then(profile => res.json(profile))
        .catch(next);
});


module.exports = router;