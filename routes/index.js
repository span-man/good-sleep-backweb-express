var fs = require('fs');
var express = require('express');
var router = express.Router();
const multer = require('multer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({
    success: true
  })
});
// dest 上传到指定目录
router.post('/upload', multer({
  dest: 'upload'
  // }).single('file'), (req, res) => { // 单文件
}).array('file', 10), (req, res) => { // 多文件
  // console.log(req.file)

  const files = req.files
  console.log('files--17777->', files)

  let fileList = []

  // 单文件
  // let fileItem = files
  // console.log('fileItem--->', fileItem)
  // fs.renameSync(fileItem.path, `upload/${fileItem.originalname}`)
  // fileItem.path = `upload/${fileItem.originalname}`
  // res.send(fileItem)

  // 多文件
  files.map(fileItem => {
    console.log('fileItem--->', fileItem)
    fs.renameSync(fileItem.path, `upload/${fileItem.originalname}`)
    fileItem.path = `upload/${fileItem.originalname}`
    fileList.push(fileItem)
  })

  console.log('fileList-->', fileList)
  res.send(fileList)
})

router.get('/download', (req, res) => {
  console.log('req-query-->', req.query)
  req.query.url ? res.download(`upload/${req.query.url}`) : res.send({
    success: false
  })
})

module.exports = router;