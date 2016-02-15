$(document).ready(function(){
	$("#form").keyup(function() {
	var inputString = $("input").val();
	if (inputString.length===0){
		$("#matchingUsers").empty();
	}
	else {
	$("#matchingUsers").empty();
	$.get("/retrieveUsers", {searchName:inputString}, function(response) {
		var matchingUsers = response;
			for (var i = 0; i < matchingUsers.length; i++) {
			$("#matchingUsers").append("<li>" + matchingUsers[i].firstname + " " + matchingUsers[i].lastname + " " + matchingUsers[i].email + "</li>");
			}
		});
	};
});
	 $("li").hover(function(){
        $(this).css("background-color", "yellow");
    });
});

