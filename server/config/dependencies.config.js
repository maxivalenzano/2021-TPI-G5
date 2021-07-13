require("dotenv").config();

const ministerioUrl = process.env.MINISTERIO_URL;
const secretariaUrl = process.env.SECRETARIA_URL;

module.exports = {
    ministerioUrl,
    secretariaUrl 
};