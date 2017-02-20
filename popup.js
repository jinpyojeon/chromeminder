// Modeled this on an example from Google to show kittens.

var username; // remove soon

function saveUsername() {
	var username = document.getElementByName("username");
	username = username.textContent;
}

var beeGenerator = {

	requestDangerGoals_: 'https://beeminder.com/api/v1' + 
						 '/users/aba1731.json' +
						 '?auth_token=R7qosphRUcKzV6Y36h4p'
	,

	// Sends an XHR GET request to grab photos. The XHR's 'onload' event is 
	// hooked up to the 'showPhotos_' method.
	requestUser: function() {
	},

	requestBees: function() {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				beeGenerator.showGoals_(this.responseText);
			}
		};
		req.open("GET", this.requestDangerGoals_, true);
		//req.onload = this.showGoals_.bind(this);
		req.send(null);
	},

	// Handle the 'onload' event of our XHR request, generated in 'requestBees',
	// by generating 'img' elements, and stuffing them into the document for 
	// display.
	showGoals_: function(e) {

		var data = JSON.parse(e);

		var goals = data.goals;

		for (var i = 0; i < goals.length; i++) {
			var goal = document.createElement("p");
			goal.textContent = goals[i];
			document.body.appendChild(goal);
		}

		// var bees = e.target.responseXML.querySelectorAll('photo');
		// for(var i = 0; i < bees.length; i++) {
		//   var img = document.createElement('img');
		//   img.src = this.constructBeeURL_(bees[i]);
		//   img.setAttribute('alt', bees[i].getAttribute('title'));
		//   document.body.appendChild(img);
		// }
	},

	// Given a photo, construct a URL...
	constructBeeURL_: function(photo) {
		return "http://farm" + photo.getAttribute("farm") +
			".static.flickr.com/" + photo.getAttribute("server") +
			"/" + photo.getAttribute("id") +
			"_" + photo.getAttribute("secret") +
			"_s.jpg";
	}
};

// Run bee generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
	beeGenerator.requestBees();
});