const express = require('express');
const router = express.Router();
const zodiacService = require('../services/zodiac.service');

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', async (req, res,next) =>  {
    zodiacService.get()
        .then(zodiac => res.json(zodiac))
        .catch(next);
});

module.exports = router;