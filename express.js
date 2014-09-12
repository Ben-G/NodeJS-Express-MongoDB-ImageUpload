var express = require('express')
  , mongoskin = require('mongoskin')
  , bodyParser = require('body-parser')

var fs = require('fs')

var app = express()
app.use(bodyParser())

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var db = mongoskin.db('mongodb://@localhost:27017/advancedProject', {safe:true})

app.post('/image', multipartMiddleware, function(req, res, next) {
  var collection = db.collection("images");

  var imageData = fs.readFileSync(req.files.image.path)
  fs.unlinkSync(req.files.image.path)

  var entry = {image: imageData, "content-type" : req.files.image.headers["content-type"]}


  collection.insert(entry, {}, function(e, results){
    if (e) return next(e)
    res.send({id: results[0]._id})
  })
})

app.get('/image/:id', function(req, res, next) {
  var collection = db.collection("images");

  collection.findById(req.params.id, function(e, result){
    if (e) return next(e)
    res.header("Content-Type", result["content-type"])
    res.send(result.image.buffer)
  })
})

app.listen(3000)
