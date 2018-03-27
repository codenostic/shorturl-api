var URL = require('../models/url')

exports.url = function(req, res, next){
  var url = new URL({
    url: req.query.query
  })
  url.save(function(err, url){
    if(err) {return next(err)}
    res.send('new url = http://fcc-short-url.glitch.com/'+url.id )
  })
}

exports.web = function(req, res){
  URL.findById(req.params.id)
    .exec(function(err, url){
    res.redirect(url.url)
  })
}