var URL = require('../models/url')
var { query, validationResult } = require('express-validator/check')

exports.url = function(req, res, next){
  //validation
  query('query').isURL().withMessage('You did not pass a valid url')
  //response
  var errors = validationResult(req);
  var url = new URL({
    url: req.query.query
  })
  if(!errors.isEmpty()){
    res.json({error: 'has error'})
  }
  else{
    URL.find({url: req.query.query})
      .exec(function(err, found){
      if(err){return next(err)}
      if(found){
        res.json(found)
      }
      else{
          url.save(function(err, url){
            if(err) {return next(err)}
            res.send('new url = https://fcc-short-url.glitch.me/'+url.id )
          })
      }
    })
  }
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