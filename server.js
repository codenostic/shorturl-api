// App starts here
const express = require('express');
const app = express();
var urlController = require('./controllers/urlController');

//connection to database
var mongoose = require('mongoose');
var mongoDB = "mongodb://root:root123@ds121299.mlab.com:21299/url_library";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error: '))

//routes
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/url", urlController.url);

app.get("/:id", urlController.web);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
