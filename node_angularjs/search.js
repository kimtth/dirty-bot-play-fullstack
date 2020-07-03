const dateFormat = require('dateformat');
const GoogleSearch = require('./gs');
const cheerio = require("cheerio");
const url = require("url");

var msg_history = [];


let message = function(req_msg, res_msg) {
  this.req_msg = req_msg;
  this.res_msg = res_msg;
  this.time_stamp = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
}

let find = function(req){
	let req_msg = req;
	let res_msg = "";
	
	GoogleSearch.resultsPerPage = 1
	var nextCounter = 0
	
	//https://www.npmjs.com/package/google
	//https://github.com/pantheonsh/google-searcher/blob/master/index.js
	GoogleSearch(req_msg, function (err, res){
		if (err) console.error(err)
		  
		//Todo -> cheerio is not able to parse the body.
		if(res){
			const $ = cheerio.load(res.body);
			const results = [];

			$("html").each(function (i, anchor) {
				let elem = $(anchor);
				let elem_text = elem.text();

				if(elem_text){
					res_msg += elem_text;
				}
			});
		}
	})

	if (res_msg === ""){
		res_msg = "Sorry, I cannot think of a reply for that.";
	}else{
		res_msg = res_msg.substring(0, 150)
		console.log(res_msg.substring(0, 150));
	}
	
	let msg = new message(req_msg, res_msg);
	msg_history.push(msg);
	
	return msg_history;
}

module.exports.find = find;