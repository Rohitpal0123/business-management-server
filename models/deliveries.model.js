const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGSQL_URI, {
  dialect: "postgres",
});

const Delivery = sequelize.define(
  "Delivery",
  {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "customers", // Name of the table being referenced
        key: "id", // Key in the Customer table
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    emptyBottles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    filledBottles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "deliveries",
  }
);

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop the table if it already exists
    console.log("Deliveries table has been created or already exists.");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

initializeDatabase();

module.exports = Delivery;
