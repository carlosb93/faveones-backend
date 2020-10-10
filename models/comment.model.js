const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        content: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //Post belongs to User
                       key:'id',
                   }
                    },
        post_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'posts', //Post belongs to User
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

    return sequelize.define('Comment', attributes, options);
}