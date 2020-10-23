const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        room_status: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //Post belongs to User
                       key:'id',
                   }
                    },
        room_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'rooms', //Post belongs to User
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

    return sequelize.define('rooms-users', attributes, options);
}