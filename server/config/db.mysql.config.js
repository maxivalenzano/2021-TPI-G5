require("dotenv").config();

module.exports = {
    HOST: process.env.HOST_AUTH,
    USER: process.env.USER_AUTH,
    PASSWORD: process.env.PASSWORD_AUTH,
    DB: process.env.DB_AUTH,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
