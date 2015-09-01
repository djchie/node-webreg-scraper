var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var qs = require('querystring');
var app     = express();

// Setting up the query strings
var queries = [];
var yearTerm = '2015-92';
var depts = [
	'AC ENG','AFAM','ANATOMY','ANESTH','ANTHRO','ARABIC','ART','ART HIS','ART STU','ARTS','ARTSHUM','ASIANAM',
	'BATS','BIO','BIOCHEM','BME','BSEMD','CAMPREC','CBEMS','CEM','CHC/LAT','CHEM','CHINESE','CLASSIC','CLT&THY',
	'COM LIT','COMPSCI','CRITISM','CRM/LAW','CSE','DANCE','DERM','DEV BIO','DRAMA','E ASIAN','EARTHSS','ECO EVO',
	'ECON','ED AFF','EDUC','EECS','EHS','ENGLISH','ENGR','ENGRCEE','ENGRMAE','ENGRMSE','ENVIRON','EPIDEM','ER MED',
	'EURO ST','FAM MED','FLM&MDA','FRENCH','GEN&SEX','GERMAN','GLBLCLT','GREEK','HEBREW','HINDI','HISTORY','HUMAN',
	'HUMARTS','I&C SCI','IN4MATX','INT MED','INTL ST','ITALIAN','JAPANSE','KOREAN','LATIN','LAW','LINGUIS','LIT JRN',
	'LPS','M&MG','MATH','MED','MED ED','MGMT','MGMT EP','MGMT FE','MGMT HC','MGMTMBA','MGMTPHD','MIC BIO','MOL BIO',
	'MPAC','MUSIC','NET SYS','NEURBIO','NEUROL','NUR SCI','OB/GYN','OPHTHAL','PATH','PED GEN','PEDS','PERSIAN',
	'PHARM','PHILOS','PHRMSCI','PHY SCI','PHYSICS','PHYSIO','PLASTIC','PM&R','POL SCI','PORTUG','PP&D','PSY BEH',
	'PSYCH','PUB POL','PUBHLTH','RAD SCI','RADIO','REL STD','ROTC','RUSSIAN','SOC SCI','SOCECOL','SOCIOL','SPANISH',
	'STATS','SURGERY','TAGALOG','TOX','UCDC','UNI AFF','UNI STU','VIETMSE','VIS STD','WOMN ST','WRITING'
];

for (var i = 0; i < depts.length; i++)
{
	queries.push({
		'YearTerm' : yearTerm,
		'Dept' : depts[i]
	});
}

app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://websoc.reg.uci.edu/perl/WebSoc';
	query = qs.stringify({
		'YearTerm':'2015-92',
		'Dept':'COMPSCI'
	});
	
	var json = {};
	for (var i = 0; < queries.length; i++) {
		// Do POST calls
		// Add to overall JSON 
	}

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
			var courseJSON = {
				courseNumber : '',
				courseName : '',
				sessions : ''
			};
			for (var i = 0; i < courseTitleStart; i++) {
				var courseNumber = courseTitleStart[i].children[0].data.trim();
				var courseName = courseTitleStart[i].children[1].children[0].children[0].data.trim();
				courseJSON['courseNumber'] = courseNumber;
				courseJSON['courseName'] = courseName;

				var sessionJSON = {};
				// Find all DOM elements with <tr valigh="top" until the next white-bar-thin or blue-bar
				// Each of these will give you code, type, section, units, instructor, time, place, and final

				// Finalize the JSON
				courseJSON['sessions'] = sessionJSON;
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