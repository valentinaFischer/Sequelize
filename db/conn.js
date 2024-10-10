const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('nodesequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

/*try {
    sequelize.authenticate();
    console.log('Conectamos ao Sequelize!');
} catch (error) {
    console.log('Não foi possível se conectar: ', error);
}*/

module.exports = sequelize;