var express = require('express');
var router = express.Router();

var user = require('../models/user');
var crypto = require('crypto');
// var movie = require('../models/movie');
// var mail = require('../models/mail');
var comment = require('../models/comment');

const init_token = 'TKL02o';

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

//用户登录接口
router.post('/login', (req, res, next) => {
  let body = req.body;
  if(!body.username) {
    res.json({status:1,message:'用户名为空'})
  }

  if(!body.password) {
    res.json({status:1,message:'密码为空'})
  }

  user.findUserLogin(body.username,body.password,(err,userSave) => {
    if(userSave.length !== 0) {
    //  通过MD5查看密码
    let token_after = getMD5Password(userSave[0]._id)

    res.json({
      status:0,
      data:{token_after,user:userSave},
      message:'用户登录成功'
      })
    }else {
      res.json({status:1,message:"用户名或者密码错误"})
    }
  })
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
router.post('/postComment',(req,res,next) => {
  let body = req.body;
  if(!body.username) {
    var username = '匿名用户'
  }
  if(!body.movie_id) {
    res.json({status:1,message:'电影id为空'})
  }
  if(!body.context) {
    res.json({status:1,message:'评论内容为空'})
  }

  var saveComment = new comment({
    movie_id:body.movie_id,
    username:body.username,
    context:body.context,
    check:0
  });

  saveComment.save((err) => {
    if(err) {
      res.json({status:1,message:err})
    }else {
      res.json({status:0,message:'评论成功'})
    }
  })
});
//用户点赞
router.post('/support', (req, res, next) => {
  if(!body.movie_id) {
    res.json({status:1,message:'电影id为空'})
  }
  
});
//用户找回密码
router.post('/findPassword', (req, res, next) => {
  // 需要输入用户的邮箱信息和手机信息，同事可以更新密码
  //  这里需要两个返回情况，一个是req.body.repassword存在时，另一个是不存在时
  let body = req.body;
  if(body.repassword) {
    if(body.token) {
      if(!body.user_id) {
        res.json({status:1,message:'用户登录错误'})
      }
      if(!body.password) {
        res.json({status:1,message:'用户老密码错误'})
      }

      if(body.token == getMD5Password(body.user_id)) {
        user.findOne({_id:body.user_id,password:body.password},(err,checkUser) => {
          if(checkUser) {
            user.update({_id:body.user_id},{password:body.password},(err,userUpdate) => {
              if(err) {
                res.json({status:1,message:"更改错误",data:err})
              }
              res.json({status:0,message:'更改成功',data:userUpdate})
            })
          }else {
            res.json({staus:1,message:'用户老密码错误'})
          }
        })
      }else {
        res.json({status:1,message:'用户登录错误'})
      }

    }else {
      //  不存在code时，直接验证mail和phone
      user.findUserPassword(body.username,body.userMail,body.userPhone,(err,userFound) => {
        if(userFound.length !== 0) {
          user.update({_id:userFound[0]._id},{password:body.repassword},(err,userUpdate) => {
            if(err) {
              res.json({status:1,message:"更改错误",data:err})
            }
            res.json({status:0,message:'更改成功',data:userUpdate})
          })
        }else {
          res.json({status:1,message:'信息错误'})
        }
      })
    }
  }else {
  //  这里只验证mail和phone,返回验证成功提示和提交的字段，用于之后修改密码的操作
    if(!body.username) {
      res.json({status:1,message:"用户名称为空"})
    }
    if(!body.userMail) {
      res.json({status:1,message:"用户邮箱为空"})
    }
    if(!body.userPhone) {
      res.json({status:1,message:"用户手机为空"})
    }

    user.findUserPassword(body.username,body.userMail,body.userPhone,(err,userFound) => {
      if(userFound.length !== 0) {
        res.json({status:0,message:"验证成功,请修改密码",data:{username:body.username,userMail:body.userMail,userPhone:body.userPhone}})
      }else {
        res.json({status:1,message:"信息错误"})
      }
    })
  }
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
  let md5 = crypto.createHash('md5');
  let token_before= id + init_token;
  return md5.update(token_before).digest('hex')
}

module.exports = router;
