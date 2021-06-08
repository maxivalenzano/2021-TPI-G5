require("dotenv").config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const db = process.env.MONGO_DB;

const user_auth = process.env.MONGO_USER_AUTH;
const password_auth = process.env.MONGO_PASSWORD_AUTH;
const cluster_auth = process.env.MONGO_CLUSTER_AUTH;
const db_auth = process.env.MONGO_DB_AUTH;

module.exports = {
  url: `mongodb+srv://${user}:${password}@${cluster}.uxihz.mongodb.net/${db}?retryWrites=true&w=majority`,
  url_auth: `mongodb+srv://${user_auth}:${password_auth}@${cluster_auth}.vtty8.mongodb.net/${db_auth}?retryWrites=true&w=majority`
};
