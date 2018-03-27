var URL = require('../models/url')
var { query, validationResult } = require('express-validator/check')

exports.url = [
  //validation
  query('query').isURL().withMessage('You did not pass a valid url'),
  
  //response
  (req, res, next) => {
    var errors = validationResult(req);
    var randPath = getRandomPath();
    var url = new URL({
      url: req.query.query,
      path: randPath
    })
    if(!errors.isEmpty()){
      res.json({error: errors.array()[0].msg})
    }
    else{
      URL.findOne({url: req.query.query})
        .exec(function(err, found){
        if(err){return next(err)}
        if(found){
          res.json({'short-url':'https://fcc-short-url.glitch.me/'+found._id })
        }
        else{
          url.save(function(err, url){
            if(err) {return next(err)}
            res.json({'new-short-url':"https://fcc-short-url.glitch.me/"+url.id, errors: errors} )
          })
      }
    })
  }
  }
]


exports.web = function(req, res, next){
  URL.findById(req.params.id)
    .exec(function(err, url){
    if(err){
      res.status(404).send('Requested url not found. Please check the passed parameter')
      return next(err)}
    res.redirect(url.url)
  })
}

var getRandomPath = function(){
  const alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  var i = 0;
  while(1 < 5){
    result += alphaNum[Math.floor(Math.random()*alphaNum.length)]
  }
  return result;
}