const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGSQL_URI, {
  dialect: "postgres",
});

const Users = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Assuming userName should be unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Assuming email should be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Optional: specify table name if different from model name
  }
);

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop the table if it already exists
    console.log("Users table has been created or already exists.");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

initializeDatabase();

module.exports = Users;
