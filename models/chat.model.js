const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        message: { type: DataTypes.STRING, allowNull: false },
        received: { type: DataTypes.INTEGER, allowNull: false },
        is_private: { type: DataTypes.INTEGER, allowNull: false },
        room_id: { type: DataTypes.INTEGER,
                  allowNull: false,
                  references:{
                      model:'rooms', //Post belongs to User
                      key:'id',
                  }
                },
        sender_id: { type: DataTypes.INTEGER,
                  allowNull: false,
                  references:{
                      model:'users', //Post belongs to User
                      key:'id',
                  }
                },
        receiver_id: { type: DataTypes.INTEGER,
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

    return sequelize.define('chats', attributes, options);
}
