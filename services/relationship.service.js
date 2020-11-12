const db = require('_helpers/db');
const paginate = require('jw-paginate');
const { Op } = require('sequelize');
const _ = require('lodash');
const { param } = require('express-validator');

module.exports = {
    newRelationship,
    getAll,
    getAllMine,
    searchRelationship,
    getById,
    update,
    delete: _delete
};

async function newRelationship(params, user, req, res) {
    // console.log(params) // dev checked
    const onRelationship = require('../sockets/relationship/relation').getCalls().onRelationship

    params.user_one_id = user.id;
    params.action_user_id = user.id;
    params.status = 1;
    //*****************  params.user_two_id  enviada en el body del request
    
    try {
        const ret = await db.Relationship.create(params)
        const newRelationship = await getRelationshipWProfile(ret.dataValues.id)
        onRelationship(newRelationship) // inform the clients that new post was created(after created)
    } catch (e) { console.log(e, 'errrrrrroor!!!!!!') }
}

async function getAll(id, user) {
    

    relations = await db.Relationship.findAll({ where: { user_two_id: user.id,
                                                [Op.and]:[ {status: 1}] }, 
                                                order: [['createdAt', 'DESC']], include: ['profile_one'] });

    const page = parseInt(id) || 1;

    // get pager object for specified page
    const pager = paginate(relations.length, page);

    // get page of items from items array
    const pageOfRelations = relations.slice(pager.startIndex, pager.endIndex + 1);

    relations = { pager, pageOfRelations };

    return relations;
}
// http://localhost:4000/api/post/mine?search=cuba&page=1
async function getAllMine(user, req) {
        relations = await db.Relationship.findAll({ where: { user_one_id: user.id,
            [Op.and]:[ {status: 1}] }, 
            order: [['createdAt', 'DESC']], include: ['profile_two'] });
    


    // if(typeof req.query.page != 'undefined'){

    page = parseInt(req.query.page) || 1;
    // }

    // get pager object for specified page
    const pager = paginate(relations.length, page);

    // get page of items from items array
    const pageOfRelations = relations.slice(pager.startIndex, pager.endIndex + 1);

    relations = { pager, pageOfRelations };

    return relations;
}

// http://localhost:4000/api/post?search=cuba&page=1

async function getById(id) {
    return await getRelationship(id);
}





async function update(id, params, user) {
    const relation = await getRelationship(id);
    // en params solo debe venir status 1 2 3 4
    // Actualizar parametros y guardar
    Object.assign(relation, params);
    await relation.save();

    return relation;
}




async function _delete(id) {
    const relation = await getRelationship(id);
    await relation.destroy();
}

// Funciones de ayuda

async function getRelationshipWProfile(id) {
    const relation = await db.Relationship.findOne({ where: { id: id }, include: ['profile_one'] });
    if (!relation) throw 'Relationship not found';
    return relation;
}

async function getRelationship(id) {
    const relation = await db.Relationship.findOne({ where: { id: id }, include: ['profile_one'] });
    if (!relation) throw 'Relationship not found';
    return relation;
}
