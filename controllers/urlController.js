var URL = require('../models/url')

exports.url = function(req, res){
  res.send('requested url'+req.params.url)
}

exports.web = function(req, res){

}