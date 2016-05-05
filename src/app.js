// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system. 
// Your users are all saved in a "users.json" file, and you can currently do the following:
// - search for users
// - add new new users to your users file.
// - get your starter file here: users.jsonView in a new window

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static('public/stylesheets'));
app.use(express.static('public/javascripts'));


app.set('view engine', 'jade');
app.set('views', 'src/views');

app.get('/', function(request, response) { //displays nav links
	response.render('index');
});


app.get('/users', function(req, res) { //displays users
	fs.readFile('./users.json', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var parsedData = JSON.parse(data);
			res.render('usersList', {
				users: parsedData,
				message: req.query.message,
				usersHeading: "All Users"
			});
		};
	});
});



app.get('/search', function(request, response) { // renders page to search existing users
	response.render('search');
});

app.post('/search', function(request, response) { //post to search users
	fs.readFile('./users.json', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var searchItem = request.body.search; //Why did I need to NOT stringify the input?
			var userBase = JSON.parse(data);
			var matches = [];
			for (var i = 0; i < userBase.length; i++) {
				if (searchItem === userBase[i].firstname || searchItem === userBase[i].lastname) {
					matches.push(userBase[i]);
					// console.log('MATCH FOUND: ' + JSON.stringify(userBase[i]));
					// response.write('MATCH FOUND: ' + JSON.stringify(userBase[i])); response.end();
				} else {
					console.log("No match found.");
					// response.write("No match found.");response.end();
				}
			};
			if (matches.length === 0) {
				response.render('usersList', {
					usersHeading: "No Matching Users Found."
				});
			} else {
				response.render('usersList', {
					users: matches,
					usersHeading: "Matching Users"
				})
			};
		};
	});
});


app.get('/add', function(request, response) { //directs to add new users form
	response.render('add', {
		message: request.query.message
	});
});

app.post('/add', function(request, response) { //post to add users
	if (request.body.firstname.trim().length === 0 || request.body.lastname.trim().length === 0 || request.body.email.trim().length === 0) {
		response.redirect('/add?message=' + encodeURIComponent("All fields are required."))
	} else {
		fs.readFile('./users.json', function(err, data) {
				if (err) {
					console.log(err);
				} else {
					var parsedData = JSON.parse(data); // redefining the object with the pushed data of the new user
					parsedData.push({
						firstname: request.body.firstname,
						lastname: request.body.lastname,
						email: request.body.email
					});
					fs.writeFile('./users.json', JSON.stringify(parsedData), (err) => { //writing new file with the new object plus the added users
						if (err) {
							console.log(err)
						} else {
							response.redirect('/users?message=' + encodeURIComponent("User has been successfully added."));
						}
					});
				};
			});
		};
});

app.get('/retrieveUsers', function(request, response) {
	fs.readFile('./users.json', function(error, data) {
		if (error) {
			response.send("There was an error.");
		} else {
			var searchName = request.query.searchName;
			// console.log(searchName);
			var userBase = JSON.parse(data);
			var matches = [];

			for (var i = 0; i < userBase.length; i++) {
				if ((userBase[i].firstname.toLowerCase().indexOf(searchName.toLowerCase()) > -1) || (userBase[i].lastname.toLowerCase().indexOf(searchName.toLowerCase()) > -1))
				// || (userBase[i].email.indexOf(searchName) > -1) taking this out because it can find things that are part of the second part of the email address
				{
					matches.push(userBase[i])

				}
			};
			response.send(matches);
			// 

		}
	});
});



app.listen(process.env.PORT || 3000, function() { //server
	console.log('Example app listening on port 3000!');
});

// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
// - route 3: takes in the post request from your form, then displays matching users on a new page. 
// Users should be matched based on whether either their first or last name contains the input string.

// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.
// - route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. 
// Once that is complete, redirects to the route that displays all your users (from part 0).