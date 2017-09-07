var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './statics/uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

var upload = multer({
  storage: storage
});

app.use(express.static('statics'));
app.use(bodyParser.json());


  app.post('/upload', upload.single('IMAGE'), function (req, res) {
    res.json({
      errno: 0,
      data: req.headers.origin + '/uploads/' + req.file.filename
    });
  });

var server = app.listen('2999', function () {
  console.log('this server in port:' + 2999);
});