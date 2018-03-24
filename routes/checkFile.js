var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');
/* GET file content listing. */
router.get('/', function(req, res, next) {
  const path='file.txt';
  console.log("read file");
  var x = fs.readFile(path,'utf8',function(err, data){
    if(err)
      consol.log("eror"+err);
    res.send(data)
  })
});

module.exports = router;
