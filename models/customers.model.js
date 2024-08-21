const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PGSQL_URI, {
  dialect: 'postgres',
});

const Customer = sequelize.define('Customer', {
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
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  isSpecialOrder: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  // Other model options go here
  tableName: 'customers', // You can customize the table name
});

// Sync the model with the database (creates the table if it doesn't exist)
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop the table if it already exists
    console.log('Customers table has been created or already exists.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

initializeDatabase();

module.exports = Customer;
