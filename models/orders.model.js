const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PGSQL_URI, {
    dialect: 'postgres',
});

const Order = sequelize.define('Order', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    agreedRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'orders',
}
);

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Set force: true to drop the table if it already exists
        console.log('Order table has been created or already exists.');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
};  

initializeDatabase();

module.exports = Order;