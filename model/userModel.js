const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/aniMage')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
})


const user = conn.model('user', UserSchema);

module.exports = user;
