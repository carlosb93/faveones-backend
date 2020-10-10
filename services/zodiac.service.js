const db = require('_helpers/db');




module.exports = {
    get,
};

async function get() {
    zodiac = await db.Zodiac.findAll();

    return zodiac;
}