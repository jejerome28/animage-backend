const {user} = require('../model');

const addToUserComments = async(id, commentId) => {
    await user.findByIdAndUpdate(
        id,
        {$push: {comments:commentId}}
    );
}

module.exports = {
    addToUserComments
}
