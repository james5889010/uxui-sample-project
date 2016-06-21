document.addEventListener("DOMContentLoaded", function(event) { 
	osl.domain.restaurant.retrieveRestaurants(onGetRestaurantsSuccess, onServerError);

	function onGetRestaurantsSuccess(data) {

		var dispList = document.getElementById("restaurants-list");

		var restaurants = JSON.parse(data);
		for (var i = 0 ; i < restaurants.length ; i++) {
			var branch = restaurants[i].RestaurantDescription.Branch;
			var id = restaurants[i].RestaurantDescription.Id;

			var liNode = document.createElement("li");
			var anchor = document.createElement("a");
			liNode.setAttribute("dir", "rtl");
			anchor.setAttribute("href", "menu.html?restaurant="+id);
			anchor.appendChild(document.createTextNode(branch));
			liNode.appendChild(anchor);
			dispList.appendChild(liNode);
		}
	}

	function onServerError(error) {
		alert("error communicating with server: " + error);
	}
});
