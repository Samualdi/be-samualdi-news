const db = require("../connection");
const format = require('pg-format');

checkExists = async (tableName, columnName, value) => {
    const queryString = format('SELECT * FROM %I WHERE %I = $1', tableName, columnName);
    const result = await db.query(queryString, [value]);

    if (result.rows.length === 0) {
        return Promise.reject({status: 404, msg: 'Not found'})
    } else {
        return [];
    }
}

module.exports = checkExists;