//get comment in the database then display it to details view
const {user, comment} = require('../model');

const getComments = (id) => {
    
    const comments = comment
    .find({anime_id: id})
    .populate({path: 'user_id', select: 'username', model:user})
    
    return comments;
}

//todo populate comments by a specific user
const getUserComments = (id) => {
    const profile = user
    .findById(id)
    .populate({path: 'comments', select: 'body', model: comment})
    
    return profile
}

module.exports = {
    getComments,
    getUserComments
};
