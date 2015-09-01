var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var qs = require('querystring');
var app     = express();

app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://websoc.reg.uci.edu/perl/WebSoc';
	query = qs.stringify({
		'YearTerm':'2015-92',
		'Dept':'COMPSCI'
	});
	
	request.post({
		url:url, 
		body:query,
		headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': query.length
    }
	}, function(error, response, html){
		if(!error){
			debugger;
			var $ = cheerio.load(html);
			var courseTitleStart = $('td.CourseTitle');
			var json = {};
			for (var i = 0; i < courseTitleStart; i++) {
				var courseNumber = courseTitleStart[i].children[0].data.trim();
				var courseName = courseTitleStart[i].children[1].children[0].children[0].data.trim();

				// Find all DOM elements with <tr valigh="top" until the next white-bar-thin or blue-bar
				// Each of these will give you code, type, section, units, instructor, time, place, and final

				// Finalize the JSON
			}
		} else {
			console.log("There was an error!");
			console.log(error);
		}
	});

	// request(url, function(error, response, html){
	// 	if(!error){
	// 		var $ = cheerio.load(html);

	// 		var title, release, rating;
	// 		var json = { title : "", release : "", rating : ""};

	// 		$('.header').filter(function(){
	// 	        var data = $(this);
	// 	        title = data.children().first().text();
	// 	        release = data.children().last().children().text();

	// 	        json.title = title;
	// 	        json.release = release;
	//         })

	//         $('.star-box-giga-star').filter(function(){
	//         	var data = $(this);
	//         	rating = data.text();

	//         	json.rating = rating;
	//         })
	// 	}

	// 	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
 //        	console.log('File successfully written! - Check your project directory for the output.json file');
 //        })

 //        res.send('Check your console!')
	// })
})

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app; 	