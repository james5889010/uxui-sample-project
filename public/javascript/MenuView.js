$(function() {

	var restId = location.search.split("restaurant=")[1];

	osl.domain.restaurant.retrieveRestaurant(onGetRestaurantSuccess, onServerError, restId);

	function onServerError(error) {
		alert("error communicating with server: " + error);
	}

	function onGetRestaurantSuccess(data) {

		var menuContainer = document.getElementById("menu-container");
		var restaurant = JSON.parse(data);
		var menuCats = restaurant.RestaurantMenuCategories;

		for (var i=0; i < menuCats.length; i++ ) {
			var listBox = createListBox(menuCats[i]);
			var listBoxList = document.createElement("ol");

			for (var j = 0 ; j < menuCats[i].Items.length ; j++) {
				var listItem = createListItem(menuCats[i].Items[j]);
				listBoxList.appendChild(listItem);
			}

			listBox.appendChild(listBoxList);
			menuContainer.appendChild(listBox)
		}

	}

	function createListBox(menuCat) {
		var listBoxNode = document.createElement("div");
		listBoxNode.setAttribute("class", "list-box");

		var listBoxHeader = document.createElement("header");
		listBoxHeader.appendChild(document.createTextNode(menuCat.Title));

		listBoxNode.appendChild(listBoxHeader);
		return listBoxNode;
	}

	function createListItem(item) {
		var listBoxItem = document.createElement("li");
		listBoxItem.setAttribute("class", "item");

		var itemInfo = document.createElement("p");

		var itemTitle = document.createElement("span");
		itemTitle.setAttribute("class", "item-title");
		itemTitle.appendChild(document.createTextNode(item.Title));
		itemInfo.appendChild(itemTitle);

		var itemPrice = document.createElement("span");
		itemPrice.setAttribute("class", "item-price");
		itemPrice.appendChild(document.createTextNode(item.Price));
		itemInfo.appendChild(itemPrice);

		listBoxItem.appendChild(itemInfo);

		var itemDetail = document.createElement("p");
		itemDetail.setAttribute("class", "item-detail");
		itemDetail.appendChild(document.createTextNode(item.Description));
		
		listBoxItem.appendChild(itemDetail);

		return listBoxItem;
	}
	$( "#basket" ).click(function() {
		$( ".order-container" ).toggle( "slide" );
	});
});