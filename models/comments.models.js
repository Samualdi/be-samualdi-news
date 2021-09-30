const db = require('../db/connection');
const checkExists = require('../db/utils/data-validation');

exports.deleteComment = async (comment_id) => {
    await checkExists('comments', 'comment_id', comment_id);
    const result = await db.query('DELETE FROM comments WHERE comment_id = $1;', [comment_id]);
    return result;
}

exports.changeCommentVotes = async (inc_votes, comment_id) => {
    await checkExists('comments', 'comment_id', comment_id);
    if (inc_votes === undefined || typeof inc_votes !== 'number') {
        return Promise.reject({ status: 400, msg: "Bad request" });
    } else {
        const result = await db.query('UPDATE comments SET votes = votes + $1 WHERE comment_id =$2 RETURNING*', [inc_votes, comment_id]);
        return result.rows[0];
    }
}
