const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = model;

// user_one_id
// user_two_id
// status
// action_user_id
function model(sequelize) {
    const attributes = {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_one_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //relationship belongs to User
                       key:'id',
                   }
                    },
        user_two_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //relationship belongs to User
                       key:'id',
                   }
                    },
        action_user_id: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'users', //relationship belongs to User
                       key:'id',
                   }
                    },
        status: { type: DataTypes.INTEGER,
                   allowNull: false,
                   references:{
                       model:'statuses', //relationship belongs to Status
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

    return sequelize.define('relationship', attributes, options);
}

