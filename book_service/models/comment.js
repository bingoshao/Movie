var mongoose = require('../common/db');

var Schema = mongoose.Schema

let comment = {
    movie_id:String,
    username:String,
    context:String,
    check:String,
};
//用户数据集
var commentSchema = new Schema(comment);
//把model放在前面，把方法挂载到model上
var commentModel = mongoose.model('commentModel',commentSchema);

commentModel.findAll = function (callBack) {
    this.find({},callBack)
};

commentModel.findByMovieId = function(m_id,callBack){
    this.find({movie_id:m_id},callBack)
};

module.exports = commentModel;