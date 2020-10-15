// const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // Crea la BD en caso de que no exista
    // const { host, port, user, password, database } = config.database;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Conectando a la BD
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Inicializando modelos y agregandolos a el objeto de BD creado
    //model user
    db.User = require('../models/user.model')(sequelize);
    //model zodiac
    db.Zodiac = require('../models/zodiac.model')(sequelize);
    //model profile
    db.Profile = require('../models/profile.model')(sequelize);
    // relations blongs
    db.Profile.belongsTo(db.User,{foreignKey: 'user_id', as: 'user'});
    db.Profile.belongsTo(db.Zodiac,{foreignKey: 'zodiac_id', as: 'zodiac'});
    //model post
    db.Post = require('../models/post.model')(sequelize);
    // relations blongs
    db.Post.belongsTo(db.User,{foreignKey: 'user_id', as: 'user'});
    //model comments
    db.Comment = require('../models/comment.model')(sequelize);
    // relations blongs
    db.Comment.belongsTo(db.User,{foreignKey: 'user_id', as: 'user'});
    db.Comment.belongsTo(db.Post,{foreignKey: 'post_id', as: 'post'});
    // relations hasmany
    db.User.hasMany(db.Post,{foreignKey: 'user_id', as: 'posts'});
    db.User.hasMany(db.Comment,{foreignKey: 'user_id', as: 'comments'});
    db.Post.hasMany(db.Comment,{foreignKey: 'post_id', as: 'comments'});
    db.User.hasMany(db.Profile,{foreignKey: 'user_id', as: 'profile'});
    db.Zodiac.hasMany(db.Profile,{foreignKey: 'zodiac_id', as: 'profile'});
    

    db.Zodiac.sync().then(() => {
        
            db.Zodiac.create({
                name: 'Aries',
                description: '21 of March - 19 of April'
            });
            db.Zodiac.create({
                name: 'Tauro',
                description: '20 of April - 21 of Mayo'
            });
            db.Zodiac.create({
                name: 'Geminis',
                description: '21 of Mayo - 20 of June'
            });
            db.Zodiac.create({
                name: 'Cancer',
                description: '21 of June - 22 of July'
            });
            db.Zodiac.create({
                name: 'Leo',
                description: '23 of July - 22 of August'
            });
            db.Zodiac.create({
                name: 'Virgo',
                description: '23 of August - 22 of Septemer'
            });
            db.Zodiac.create({
                name: 'Libra',
                description: '23 of Septemer - 22 of October'
            });
            db.Zodiac.create({
                name: 'Escorpio',
                description: '22 of October - 21 of November'
            });
            db.Zodiac.create({
                name: 'Sagitario',
                description: '22 of November - 21 of December'
            });
            db.Zodiac.create({
                name: 'Capricornio',
                description: '22 of December - 19 of January'
            });
            db.Zodiac.create({
                name: 'Acuario',
                description: '20 of January - 18 of February'
            });
            db.Zodiac.create({
                name: 'Piscis',
                description: '19 of February - 20 of March'
            });
         
        
        
    });
    // Sincronizando los modelos con la BD

    await sequelize.sync();
}