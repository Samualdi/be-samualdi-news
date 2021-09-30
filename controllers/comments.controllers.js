
const { deleteComment, changeCommentVotes } = require('../models/comments.models');

exports.removeComment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        await deleteComment(comment_id);
        res.status(204).send();
        
    } catch (err) {
        next(err);
    }
}

exports.updateCommentVotes = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { inc_votes } = req.body;
        const updatedComment = await changeCommentVotes(inc_votes, comment_id);
        res.status(200).send({ updatedComment: updatedComment });
    
    } catch (err) {
        next(err);
}
}