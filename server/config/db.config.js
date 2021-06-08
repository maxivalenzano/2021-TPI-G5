require("dotenv").config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const db = process.env.MONGO_DB;

module.exports = {
  url: `mongodb+srv://${user}:${password}@${cluster}.uxihz.mongodb.net/${db}?retryWrites=true&w=majority`,
};
