var express = require('express');
var router = express.Router();
//数据库引入
let mongoose = require('mongoose');

//定义路由
router.get('/',(req,res,next) => {
  mongoose.connect('mongodb://localhost:27017/pets',{useNewUrlParser:true});
  mongoose.Promise = global.Promise;

  let Dog = mongoose.model('Dog',{name:String});

  let tom = new Dog({
    name:'nav'
  });

  tom.save(err => {
    if(err) {
      console.log(err)
    }else {
      console.log('success insert')
    }
  });

  res.send('数据库连接测试')

});

module.exports = router;