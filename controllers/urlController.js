var URL = require('../models/url')

exports.url = function(req, res, next){
  var url = new URL({
    url: req.query.query
  })
  url.save(function(err, url){
    if(err) {return next(err)}
    res.send('new url = https://fcc-short-url.glitch.me/'+url.id )
  })
}

exports.web = function(req, res, next){
  URL.findById(req.params.id)
    .exec(function(err, url){
    if(err){
      res.status(404).send('Requested url not found. Please check the passed parameter')
      return next(err)}
    res.redirect(url.url)
  })
}