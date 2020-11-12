
// post send request with my id his id and status pending
// post action for request with my id and his id
// get relations by status
// get someone relationships in common with me

const express = require('express');
const authorize = require('_middleware/authorize')
const router = express.Router();
const relationshipService = require('../services/relationship.service');

// Rutas
// ToDo cambiar a un fichero aparte
router.post('/', authorize(), async (req, res, next) => {
    relationshipService.newRelationship(req.body, req.user, req, res)
        .then(() => res.json({ message: 'Successfully sended' }))
        .catch(next);
});

router.put('/:id', authorize(), async (req, res, next) => {
    const schema = Joi.object({
        status: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}, async (req, res, next) => {
    relationshipService.update(req.params.id, req.body, req.user,)
        .then(relation => res.json(relation))
        .catch(next);
});

// router.get('/', async (req, res, next) => {
//     relationshipService.searchRelationship(req)
//         .then(relations => res.json(relations))
//         .catch(next);
// });
// http://localhost:4000/api/relationship?search=pending&page=1

router.get('/page/:id', async (req, res, next) => {
    relationshipService.getAll(req.params.id,req.user)
        .then(relations => res.json(relations))
        .catch(next);
});

router.get('/mine',authorize(), async (req, res, next) => {
    relationshipService.getAllMine(req.user, req)
        .then(relations => res.json(relations))
        .catch(next);
}
);

router.get('/:id', authorize(), async (req, res, next) => {
    relationshipService.getById(req.params.id)
        .then(relation => res.json(relation))
        .catch(next);
});


router.delete('/:id', authorize(), async (req, res, next) => {
    relationshipService.delete(req.params.id)
        .then(() => res.json({ message: 'Relation eliminated successfully' }))
        .catch(next);
});


module.exports = router;