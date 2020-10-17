const db = require('_helpers/db');
const paginate = require('jw-paginate');
const {Op} = require('sequelize');
const _ = require('lodash');




module.exports = {
    newComment,
    getAll,
    getAllCommentsFromPost,
    getAllMine,
    searchComments,
    getById,
    update,
    delete: _delete
};

async function newComment(params,user,req,res) {
   
    params.user_id = user.id;
    // params.post_id 

        // Guardando comments
        await db.Comment.create(params);
}

async function getAll(id) {
    sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    today = new Date(new Date().setDate(new Date().getDate()));
    
    comments = await db.Comment.findAll({where:{ createdAt:{ [Op.gt]:sevenDaysAgo, [Op.lt]:today }}, include: ['profile']});
    
    const page = parseInt(id) || 1;

    // get pager object for specified page
    const pager = paginate(comments.length, page);

    // get page of items from items array
    const pageOfComments = comments.slice(pager.startIndex, pager.endIndex + 1);

    comments = {pager, pageOfComments};

    return comments;
}
async function getAllCommentsFromPost(req) {
    sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    today = new Date(new Date().setDate(new Date().getDate()));
    
    comments = await db.Comment.findAll({where:{ post_id: req.query.post, createdAt:{ [Op.gt]:sevenDaysAgo, [Op.lt]:today }}, include: ['profile']});
    
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pager = paginate(comments.length, page);

    // get page of items from items array
    const pageOfComments = comments.slice(pager.startIndex, pager.endIndex + 1);

    comments = {pager, pageOfComments};

    return comments;
}
// http://localhost:4000/api/comment/mine?search=cuba&page=1
async function getAllMine(user,req) {
    if(typeof req.query.search != 'undefined'){

        comments = await db.Comment.findAll({where:{ user_id: user.id,
            [Op.or]: [
            {title:{[Op.like]: '%' + req.query.search + '%'}}, 
            {content:{[Op.like]: '%' + req.query.search + '%'}}
        ]}, include: ['user']});
    }
    else{
        comments = await db.Comment.findAll({where:{ user_id: user.id,}, include: ['profile','post']});
    }

    // if(typeof req.query.page != 'undefined'){

      page = parseInt(req.query.page) || 1;
    // }

    // get pager object for specified page
    const pager = paginate(comments.length, page);

    // get page of items from items array
    const pageOfComments = comments.slice(pager.startIndex, pager.endIndex + 1);

    comments = {pager, pageOfComments};

    return comments;
}

// http://localhost:4000/api/comment?search=cuba&page=1

async function searchComments(req) {

    sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    today = new Date(new Date().setDate(new Date().getDate()));

    if(typeof req.query.search != 'undefined'){
        // query
        comments = await db.Comment.findAll({where:{ createdAt:{ [Op.gt]:sevenDaysAgo, [Op.lt]:today },[Op.or]: [
            {title:{[Op.like]: '%' + req.query.search + '%'}}, 
            {content:{[Op.like]: '%' + req.query.search + '%'}}
        ] }, include: ['profile']});
      }
      if(typeof req.query.page != 'undefined'){

        pag = parseInt(req.query.page) || 1;

      }

    // get pager object for specified page
    const pager = paginate(comments.length, pag);

    // get page of items from items array
    const pageOfComments = comments.slice(pager.startIndex, pager.endIndex + 1);

    comments = {pager, pageOfComments};

    return comments;
}

async function getById(id) {
    return await getComment(id);
}





async function update(id, params) {
    const comment = await getComment(id);

    // Actualizar parametros y guardar
    Object.assign(comment, params);
    await comment.save();

    return comment;
}




async function _delete(id) {
    const comment = await getComment(id);
    await comment.destroy();
}

// Funciones de ayuda

async function getComment(id) {
    const comment = await db.Comment.findByPk(id);
    if (!comment) throw 'Comment not found';
    return comment;
}


