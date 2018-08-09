var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    headPortrait: String,  //头像
    openId: String,
    nickName: String
})

module.exports = userSchema;