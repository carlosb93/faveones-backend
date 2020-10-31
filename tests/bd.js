const db = require('_helpers/db');

async function getPost(id) {
  // const post = await db.Post.findByPk(parseInt(id));
  const post = await db.Post.findOne({ where: { id: id }, include: ['profile'] });
  if (!post) throw 'Post not found';
  return post;
}

module.exports = {
  getPostById: getPost,
}