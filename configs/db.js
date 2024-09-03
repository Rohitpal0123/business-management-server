const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("pooja_beverages_db", "rohit", "neQwE9WPM0PNdyr2nkZfUtSL6Cd8qpFR", {
  host: "dpg-crbhd7tds78s73dfpnp0-a.singapore-postgres.render.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This bypasses certificate validation
    },
  },
  logging: true,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};



module.exports = { sequelize, connectDB };
