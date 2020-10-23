const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.JSON, allowNull: true },
        owner_id: { type: DataTypes.INTEGER,
                   allowNull: true,
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

    return sequelize.define('rooms', attributes, options);
}