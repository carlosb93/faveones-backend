const express = require('express');
const Profile = require('../controllers/profile.controller');
const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', authorize(), Profile.get);
router.put('/', authorize(), Profile.update);

module.exports = router;