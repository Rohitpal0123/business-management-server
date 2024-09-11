const { Sequelize } = require("sequelize");

const { development, production } = require("../lib/constants");
const sequelize = new Sequelize("business_management", "rohit", "Zuye7mqxMS8V9ciK9RDBOhOeGyWxFw5i", {
  host: "dpg-cr1neio8fa8c73aasjk0-a.singapore-postgres.render.com",
  port: 5432,
  dialect: "postgres",
  logging: false, // Disable logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This bypasses certificate validation
    },
  },
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
