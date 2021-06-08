module.exports = {
    HOST: "us-cdbr-east-03.cleardb.com",
    USER: "b6def9c9e50ecc",
    PASSWORD: "5c37b9fa",
    DB: "heroku_eced50f94815310",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
