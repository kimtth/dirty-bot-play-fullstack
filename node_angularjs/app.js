var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var env = require('dotenv').load();
var port = process.env.PORT || 4300;
var search = require('./search')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'angularjs/dist/pyChatUI/')));

app.get('/api/msg', function(req, res) {
	req_msg = req.query.reqMsg;
	msg_history = search.find(req_msg);

	var data = []
	msg_history.forEach(function(msg){
	  data.push({
		req_msg: msg.req_msg,
		res_msg: msg.res_msg,
		time_stamp: msg.time_stamp
	  });
	});
  
	res.status(200).json(data);
});

app.use(function (req, res) {
  res.status(404).render('404', { title: 'Hey', message: 'Sorry can\'t find that!' })
})

app.listen(port);
console.log('app listening on port: ' + port);
  
module.exports = app;