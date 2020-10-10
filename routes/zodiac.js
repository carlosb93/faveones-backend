const express = require('express');
const Zodiac = require('../controllers/zodiac.controller');
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', Zodiac.get);

module.exports = router;