document.addEventListener("DOMContentLoaded", function(event) { 
	osl.domain.restaurant.retrieveRestaurants(onGetRestaurantsSuccess, onServerError);

	function onGetRestaurantsSuccess(data) {

		var dispList = document.getElementById("restaurants-list");

		var restaurants = JSON.parse(data);
		for (var i = 0 ; i < restaurants.length ; i++) {
			var branch = restaurants[i].RestaurantDescription.Branch;
			var id = restaurants[i].RestaurantDescription.Id;

			var liNode = document.createElement("li");
			var liInnterHtml = "<a href='menu.html?restaurant="
				+id
				+"'><span class='branch'>"
				+branch
				+"</span><span class='list-image'>"
				+"<img src='img/chevron.png'/></span></a>";
			liNode.innerHTML = liInnterHtml;
			dispList.appendChild(liNode);
		}
	}

	function onServerError(error) {
		alert("error communicating with server: " + error);
	}
}); 
