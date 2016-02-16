$(document).ready(function() {
	var timeOnCompletion = 0;
	$("#form").keyup(function() { //on keyup, do stuff
		var inputString = $("input").val();
		if (inputString.length === 0) {
			$("#matchingUsers").empty();
		} else {
			var timeInMsNow = Date.now();
			var times = timeInMsNow - timeOnCompletion;
			console.log("The values of times is: " + times);
			// console.log("timeOnCompletion at the top" + timeOnCompletion);
			if (times >= 300) {
				// console.log("Time In Ms Now:" + timeInMsNow);
				// console.log("Time On Completion in the middle here: "+ timeOnCompletion);
				$("#matchingUsers").empty();
				$.get("/retrieveUsers", {
					searchName: inputString
				}, function(response) {
					var matchingUsers = response;
					for (var i = 0; i < matchingUsers.length; i++) {
						$("#matchingUsers").append("<li>" + matchingUsers[i].firstname + " " + matchingUsers[i].lastname + " " + matchingUsers[i].email + "</li>");
					};
					timeOnCompletion = Date.now();
					// console.log("Time on Completion at end: " + timeOnCompletion);
				});
			};
		};
	});
});