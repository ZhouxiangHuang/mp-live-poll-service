var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    openId: { type: [String], index: true }
});

//选项
var choiceSchema = new Schema({
    text: String,
    users: [userSchema]
});

var pollSchema = new Schema({
    title: String,
    description: String,
    creatorId: String,  // 创建者openId
    anonymous: { 
        type: Boolean, 
        default: false 
    },    // 是否匿名
    options: [choiceSchema],
    createdAt: {
        type: Date,
        default: new Date()
    },
    endAt: {
        type: Date,
        default: new Date()
    }
});
module.exports =  mongoose.model('Poll', pollSchema);