var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var jwtAuth = require('../middleware/jwt')
    //数据库引入
let mongoose = require('mongoose');

var user = require('../models/user');

const secretKey = 'aaa'; //撒盐：加密的时候混淆

// 所有请求过来都会进行身份验证
router.use(jwtAuth);
// 路由中间件
router.use((req, res, next) => {
    // 任何路由信息都会执行这里面的语句
    console.log('this is a api request!');
    // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
    next();
});

//定义路由
router.post('/login', (req, res, next) => {
    let body = req.body;
    if (!body.username) {
        res.json({ code: 1, message: '用户名为空' })
    }

    if (!body.password) {
        res.json({ code: 1, message: '密码为空' })
    }
    user.findUserLogin(body.username, body.password, (err, userSave) => {
        if (userSave.length !== 0) {
            //  通过MD5查看密码
            let tokenObj = { name: body.username, pwd: body.password }
            let token = jwt.sign(tokenObj, secretKey, {
                expiresIn: 60 * 60 * 24 // 授权时效24小时
            });
            res.json({
                code: 0,
                success: true,
                message: 'success',
                data: { token }
            });
            //解密token
            // jwt.verify(tokenObj, secretKey, (err, decoded) => {
            //     if (!err) {
            //         console.log(decoded.name); //会输出123，如果过了60秒，则有错误。
            //     }
            // })
        } else {
            res.json({ code: 1, message: "用户名或者密码错误" })
        }
    })
});

module.exports = router;