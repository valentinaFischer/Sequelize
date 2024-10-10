const { DataTypes } = require('sequelize'); // Dá acesso a todos tipos de dados que temos no banco.

const db = require('../db/conn'); // Pois estamos fazendo uma operação com o banco.

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false // Não aceita nulos.
    },
    occupation: {
        type: DataTypes.STRING,
        required: true // Não aceita vazios nem nulos.
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        required: true
    },
});

module.exports = User;