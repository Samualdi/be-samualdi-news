const db = require('../db/connection');
const checkExists = require('../db/utils/data-validation');

exports.fetchUsers = async () => {
    const result = await db.query('SELECT * FROM users ORDER BY username;')
    return result.rows;
}

exports.fetchUser = async (username) => {
    await checkExists('users', 'username', username);
    const result = await db.query('SELECT * FROM users WHERE username = $1;', [username]);
    return result.rows[0];
   
}