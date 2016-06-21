document.addEventListener("DOMContentLoaded", function(event) { 
	osl.domain.restaurant.retrieveRestaurants(onGetRestaurantsSuccess, onServerError);

	function onGetRestaurantsSuccess(data) {

		let dispList = document.getElementById("restaurants-list");

		let restaurants = JSON.parse(data);
		for (let i = 0 ; i < restaurants.length ; i++) {
			let name = restaurants[0].RestaurantDescription.Name;

			let liNode = document.createElement("li");
			liNode.appendChild(document.createTextNode(name));
			dispList.appendChild(liNode);
		}
	}

	function onServerError(error) {
		alert("error communicating with server: " + error);
	}
});