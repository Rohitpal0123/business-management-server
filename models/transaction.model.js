const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGSQL_URI, {
    dialect: "postgres",
  });

const Transaction = sequelize.define(
  "Transaction",
  {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    period: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalDeliveries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    agreedRate: {
      type: DataTypes.NUMERIC,
    },
    previousBalance: {
      type: DataTypes.NUMERIC,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.NUMERIC,
    },
    paidAmount: {
      type: DataTypes.NUMERIC,
      defaultValue: 0,
    },
    netBalance: {
      type: DataTypes.NUMERIC,
      defaultValue: 0,
    }
  },
  {
    tableName: "transactions",
    timestamps: false,
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

module.exports = Transaction;
