var mongoose = require('../common/db');

var Schema = mongoose.Schema

let user = {
    username:String,
    password:String,
    userMail:String,
    userPhone:String,
    userAdmin:Boolean,
    userPower:Number,
    userStop:Boolean
};
//用户数据集
var userSchema = new Schema(user);
//把model放在前面，把方法挂载到model上
var userModel = mongoose.model('userModel',userSchema);
//用户的查找方法
userModel.findAll = function (callBack) {
    this.find({},callBack)
};

//使用用户名查找的方式
userModel.findByUsername = function(name,callBack){
    return this.find({username:name},callBack)
};

//登录匹配是不是拥有相同的用户名和密码并且没有处于封停状态
userModel.findUserLogin = function(name,password,callBack) {
    this.find({username:name,password:password,userStop:false},callBack);
};

//验证邮箱、电话和用户名找到用户
userModel.findUserPassword = function(name,mail,phone,callBack) {
   return this.find({username:name,userMail:mail,userPhone:phone},callBack);
};

module.exports = userModel;