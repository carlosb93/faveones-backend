const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: true },
        user_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //Post belongs to User
                       key:'id',
                   }
                    },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false }
    };

    const options = {
        defaultScope: {
            // excluyendo password por defecto
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // Incluyendo password con este scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('posts', attributes, options);
}