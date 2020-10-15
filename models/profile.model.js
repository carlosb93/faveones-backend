const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        lastname: { type: DataTypes.STRING, allowNull: true },
        nick: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        avatar: { type: DataTypes.JSON, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: false },
        birthday: { type: DataTypes.STRING, allowNull: true },
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