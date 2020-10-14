const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        nick: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.JSON, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        zodiac_id: { type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'zodiacs', //Post belongs to User
                key:'id',
            }
             },
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

    return sequelize.define('Profile', attributes, options);
}