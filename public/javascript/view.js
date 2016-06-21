document.addEventListener("DOMContentLoaded", function(event) { 
	osl.domain.restaurant.retrieveRestaurants(onGetRestaurantsSuccess, onServerError);

	function onGetRestaurantsSuccess(data) {

		var dispList = document.getElementById("restaurants-list");

		var restaurants = JSON.parse(data);
		for (var i = 0 ; i < restaurants.length ; i++) {
			var name = restaurants[0].RestaurantDescription.Name;

			var liNode = document.createElement("li");
			liNode.appendChild(document.createTextNode(name));
			dispList.appendChild(liNode);
		}
	}

	function onServerError(error) {
		alert("error communicating with server: " + error);
	}
});