const express = require('express');
const Auth = require('../controllers/users.controller');
const authorize = require('_middleware/authorize')
const router = express.Router();

// Rutas
// ToDo cambiar a un fichero aparte
router.get('/', authorize(), Auth.getAll);
router.get('/current', authorize(), Auth.getCurrent);
router.get('/:id', authorize(), Auth.getById);
router.put('/:id', authorize(), Auth.updateSchema, Auth.update);
router.delete('/:id', authorize(), Auth._delete);

module.exports = router;