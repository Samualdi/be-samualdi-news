const db = require('../db/connection');
const checkExists = require('../db/utils/data-validation');

exports.deleteComment = async (comment_id) => {
    await checkExists('comments', 'comment_id', comment_id);
    const result = await db.query('DELETE FROM comments WHERE comment_id = $1;', [comment_id]);
    return result;
}