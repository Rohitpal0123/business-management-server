require("dotenv").config();

module.exports = {
  production: process.env.ENV === 'production',
  development: process.env.ENV === 'development',
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  jwtSecret: process.env.JWT_SECRET,
  port: this.production ? process.env.PORT : 8000,
  jwt_expiry: this.production ? "30d" : "1d",
};
