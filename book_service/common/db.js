var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/movieServer';

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("数据库连接成功......"))
.catch(err => console.log(err));

//连接数据库
module.exports = mongoose;
