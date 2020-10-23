const db = require('_helpers/db');
const paginate = require('jw-paginate');
const {Op} = require('sequelize');
const _ = require('lodash');




module.exports = {
    newPost,
    getAll,
    getAllMine,
    searchPosts,
    getById,
    update,
    delete: _delete
};

async function newPost(params,user,req,res) {
    let data = [];
    
    if(!req.files) {
        params.image = '';
    }else{
        _.forEach(_.keysIn(req.files.photos), (key) => {
            let photo = req.files.photos[key];
            
            //move photo to upload directory
            photo.mv('../uploads/' + user.id +'-'+ user.email +'/publicaciones/image-'+ photo.name);

            //push file details
            data.push({
                url: '../uploads/' + user.id +'-'+ user.email +'/publicaciones/image-'+ photo.name,
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size
            });
        });
    }
    params.image = JSON.stringify(data);
    params.user_id = user.id;
        // Guardando posts
    await db.Post.create(params);
}

async function getAll(id) {
    sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    today = new Date(new Date().setDate(new Date().getDate()));
    
    posts = await db.Post.findAll({where:{ createdAt:{ [Op.gt]:sevenDaysAgo, [Op.lt]:today }}, order:[['createdAt','DESC']], include: ['profile']});
    
    const page = parseInt(id) || 1;

    // get pager object for specified page
    const pager = paginate(posts.length, page);

    // get page of items from items array
    const pageOfPosts = posts.slice(pager.startIndex, pager.endIndex + 1);

    posts = {pager, pageOfPosts};

    return posts;
}
// http://localhost:4000/api/post/mine?search=cuba&page=1
async function getAllMine(user,req) {
    if(typeof req.query.search != 'undefined'){

        posts = await db.Post.findAll({where:{ user_id: user.id,
            [Op.or]: [
            {title:{[Op.like]: '%' + req.query.search + '%'}}, 
            {content:{[Op.like]: '%' + req.query.search + '%'}}
        ]}, include: ['profile']});
    }
    else{
        posts = await db.Post.findAll({where:{ user_id: user.id,}, order:[['createdAt','DESC']], include: ['profile']});
    }

    // if(typeof req.query.page != 'undefined'){

      page = parseInt(req.query.page) || 1;
    // }

    // get pager object for specified page
    const pager = paginate(posts.length, page);

    // get page of items from items array
    const pageOfPosts = posts.slice(pager.startIndex, pager.endIndex + 1);

    posts = {pager, pageOfPosts};

    return posts;
}

// http://localhost:4000/api/post?search=cuba&page=1

async function searchPosts(req) {

    sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    today = new Date(new Date().setDate(new Date().getDate()));

    if(typeof req.query.search != 'undefined'){
        // query
        posts = await db.Post.findAll({where:{ createdAt:{ [Op.gt]:sevenDaysAgo, [Op.lt]:today },[Op.or]: [
            {title:{[Op.like]: '%' + req.query.search + '%'}}, 
            {content:{[Op.like]: '%' + req.query.search + '%'}}
        ] }, order:[['createdAt','DESC']], include: ['profile']});
      }
      if(typeof req.query.page != 'undefined'){

        pag = parseInt(req.query.page) || 1;

      }

    // get pager object for specified page
    const pager = paginate(posts.length, pag);

    // get page of items from items array
    const pageOfPosts = posts.slice(pager.startIndex, pager.endIndex + 1);

    posts = {pager, pageOfPosts};

    return posts;
}

async function getById(id) {
    return await getPost(id);
}





async function update(id, params) {
    const post = await getPost(id);

    if(!req.files) {
        
    }else{
        let data = [];
        _.forEach(_.keysIn(req.files.photos), (key) => {
            let photo = req.files.photos[key];
            
            //move photo to upload directory
            photo.mv('../uploads/' + post.user.id +'-'+ post.user.email +'/publicaciones/image-'+ photo.name);

            //push file details
            data.push({
                url: '../uploads/' + post.user.id +'-'+ post.user.email +'/publicaciones/image-'+ photo.name,
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size
            });
        });
    }
    
    // Validando
    const titleChanged = params.title && post.title !== params.title;
    if (titleChanged && await db.Post.findOne({ where: { title: params.title } })) {
        throw 'Title: "' + params.title + '" of your publication is already in use';
    }
    // const contentChanged = params.content && post.content !== params.content;
    // if (contentChanged && await db.Post.findOne({ where: { content: params.content } })) {
    //     throw 'Contenido de su publicación ya esta en uso';
    // }

    // Actualizar parametros y guardar
    Object.assign(post, params);
    await post.save();

    return post;
}




async function _delete(id) {
    const post = await getPost(id);
    await post.destroy();
}

// Funciones de ayuda

async function getPost(id) {
    const post = await db.Post.findByPk({where:{ id:{id}}, include: ['profile']});
    if (!post) throw 'Post not found';
    return post;
}


