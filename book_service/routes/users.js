var express = require('express');
var router = express.Router();

var user = require('../models/user');
// var crypto = require('crypto');
// var movie = require('../models/movie');
// var mail = require('../models/mail');
// var comment = require('../models/comment');

const init_token = 'TKL02o';

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

//用户登录接口
router.post('/login', (req, res, next) => {
  res.send('respond with a resource');
});

//用户注册接口
router.post('/register', (req, res, next) => {
  let body = req.body;
  if(!body.username) {
    res.json({status:1,message:'用户名为空'})
  }
  if(!body.password) {
    res.json({status:1,message:'密码为空'})
  }
  if(!body.userMail) {
    res.json({status:1,message:'用户邮箱为空'})
  }
  if(!body.userPhone) {
    res.json({status:1,message:'用户手机为空'})
  }
  user.findByUsername(body.username,(err,userSave) => {
    if(userSave.length!==0) {
    //  返回错误信息
    res.json({status:1,message:'用户已注册'})
    }else {
      var registerUser = new user({
        username:body.username,
        password:body.password,
        userMail:body.userMail,
        userPhone:body.userPhone,
        userAdmin:0,
        userPower:0,
        userStop:0
      });

      registerUser.save(() => {
        res.json({status:0,message:"注册成功"})
      })
    }
  })
});
//用户提交评论
router.post('/postComment', (req, res, next) => {
  res.send('respond with a resource');
});
//用户点赞
router.post('/support', (req, res, next) => {
  res.send('respond with a resource');
});
//用户找回密码
router.post('/findPassword', (req, res, next) => {
  res.send('respond with a resource');
});
/*
* 用户发送站内信
* 用户显示站内信,其中的receive参数值为1时时发送的内容,值为2的时候是收到的内容
* */
router.post('/sendEmail', function(req, res, next) {
  res.send('respond with a resource');
});


//获取MD5的值
function getMD5Password(id) {
}

module.exports = router;
