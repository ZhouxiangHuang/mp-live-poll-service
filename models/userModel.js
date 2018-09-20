var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    headPortrait: String,  //头像
    openId: { type: [String], index: true },
    nickName: String
})

module.exports = mongoose.model('User', userSchema);