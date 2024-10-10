const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Adress = db.define('Adress', {

    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    }
});

User.hasMany(Adress); // Um usuário pode ter vários end.
Adress.belongsTo(User); // Um endereço pertence a um usuário

module.exports = Adress; 