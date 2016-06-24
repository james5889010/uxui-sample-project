$(function() {

    var restId = location.search.split("restaurant=")[1];

    osl.domain.restaurant.retrieveRestaurant(onGetRestaurantSuccess, onServerError, restId);

    function onServerError(error) {
        alert("error communicating with server: " + error);
    }

    function onGetRestaurantSuccess(data) {

        var menuContainer = document.getElementById("menu-container");
        var restaurant = JSON.parse(data);

        var restaurantBranch = document.getElementById("restaurant-name");
        restaurantBranch.appendChild(document.createTextNode(restaurant.RestaurantDescription.Branch));

        var menuCats = restaurant.RestaurantMenuCategories;

        for (var i = 0; i < menuCats.length; i++) {
            var listBox = createListBox(menuCats[i]);
            var listBoxList = document.createElement("ol");

            for (var j = 0; j < menuCats[i].Items.length; j++) {
                var detailsItem = createListItem(menuCats[i].Items[j]);
                listBoxList.appendChild(detailsItem);
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

        var detailsItem = document.createElement("details");

        var summaryItem = document.createElement("summary");
        summaryItem.setAttribute("class", "item");

        var itemInfo = document.createElement("p");

        var itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "item-title");
        itemTitle.appendChild(document.createTextNode(item.Title));
        itemInfo.appendChild(itemTitle);

        var itemPrice = document.createElement("span");
        itemPrice.setAttribute("class", "item-price");
        itemPrice.appendChild(document.createTextNode("€" + item.Price.toFixed(2)));
        itemInfo.appendChild(itemPrice);

        summaryItem.appendChild(itemInfo);

        var itemDetail = document.createElement("p");
        itemDetail.setAttribute("class", "item-detail");
        itemDetail.appendChild(document.createTextNode(item.Description));

        summaryItem.appendChild(itemDetail);
        detailsItem.appendChild(summaryItem);

        var selectAmountObj = createItemMoreInfo(item);
        detailsItem.appendChild(selectAmountObj);

        return detailsItem;
    }

    function createItemMoreInfo(item) {
        var selectAmountObj = document.createElement("p");
        selectAmountObj.innerHTML =
            " <button class='plus-minus-btns' onclick='adjustCounter(this, -1)'>-</button> <input type='number' value=1 class='item-amount' readonly> <button class='plus-minus-btns' onclick='adjustCounter(this, +1)'>+</button> <button class='default-button' onclick='addItemToCart(this)' data-item-id='" + item.Id + "' style='display:inline-block'>Add to Cart</button> <a href='#' onclick='closeDetails(this); return false;' style='color: #c62c02;'>Close</a>"


        return selectAmountObj;
    }

    $("#basket").click(function() {
        $(".order-container").toggle("slide");
    });

    $(".close").click(function() {
        $(".order-container").toggle("slide");
    });

});

function adjustCounter(triggeringElement, adjustment) {
    var formElements = triggeringElement.parentNode.children;
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].tagName === "INPUT") {
            var currentValue = formElements[i].value;
            if (adjustment < 0 && currentValue < 2) {
                return;
            }
            formElements[i].value = parseInt(currentValue) + adjustment;
        }
    }
}

function closeDetails(triggeringElement) {
    triggeringElement.parentNode.parentNode.removeAttribute("open");
}

function addItemToCart(triggeringElement) {
    var itemId = triggeringElement.getAttribute("data-item-id");
    var quantity;

    var siblings = triggeringElement.parentElement.children;
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].tagName === "INPUT") {
            quantity = parseInt(siblings[i].value);
        }
    }

    var orderItem = new OrderItem(itemId, quantity);

    var orderItemsString = sessionStorage.getItem("orderItems");
    if (!orderItemsString) {
        orderItemsString = "[]";
    }

    var orderItems = JSON.parse(orderItemsString);

    orderItems.push(orderItem);
    sessionStorage.setItem("orderItems", JSON.stringify(orderItems));

    displayItems();
}

function OrderItem(id, quantity) {
    this.id = id;
    this.quantity = quantity;
}

function displayItems() {

    var restId = location.search.split("restaurant=")[1];

    osl.domain.restaurant.retrieveRestaurant(onGetRestaurantForMenuItemsSuccess, null, restId);

    function onGetRestaurantForMenuItemsSuccess(data) {

        var restaurant = JSON.parse(data);
        var allItems = getAllItemsForRestaurant(restaurant);

        var userSelectedOrderItems = getItemsFromSessionStorage();

        var usersItems = [];
        for (var i = 0; i < userSelectedOrderItems.length; i++) {
            var itemWithDetails = getItemFromAllItems(userSelectedOrderItems[i].id, allItems);
            if (itemWithDetails) {
                usersItems.push(itemWithDetails);
            }
        }

        buildDomForItemsList(usersItems);
    }

    function getAllItemsForRestaurant(restaurant) {
        var allItems = [];
        for (var i = 0; i < restaurant.RestaurantMenuCategories.length; i++) {
            var menuCategory = restaurant.RestaurantMenuCategories[i];
            for (var j = 0; j < menuCategory.Items.length; j++) {
                var item = menuCategory.Items[j];
                if (item) {
                    allItems.push(item);
                }
            }
        }

        return allItems;
    }

    function getItemsFromSessionStorage() {
        var orderItemsString = sessionStorage.getItem("orderItems");

        if (orderItemsString) {
            return JSON.parse(orderItemsString);
        }
        return JSON.parse("[]");
    }

    function getItemFromAllItems(id, allItems) {
        for (var i = 0; i < allItems.length; i++) {
            if (allItems[i].Id == id) {
                return allItems[i];
            }
        }
    }

    function buildDomForItemsList(usersItems) {

        var itemsDiv = document.getElementById("order-contents");
        itemsDiv.innerHTML = "";

        for (var i = 0; i < usersItems.length; i++) {
            var liNode = buildDomForItem(usersItems[i]);
            itemsDiv.appendChild(liNode);
        }

        var totalPriceNode = createTotalNode(usersItems);

        if (usersItems.length > 0) {
            itemsDiv.appendChild(totalPriceNode);
        }

    }

    function buildDomForItem(item) {
        var liNode = document.createElement("li");

        var titleNode = document.createElement("span");
        titleNode.setAttribute("class", "item-title");
        titleNode.appendChild(document.createTextNode(item.Title));

        var priceNode = document.createElement("span");
        priceNode.setAttribute("class", "item-price");
        priceNode.appendChild(document.createTextNode("€" + item.Price.toFixed(2)));

        liNode.appendChild(titleNode);
        liNode.appendChild(priceNode);

        return liNode;
    }

    function createTotalNode(usersItems) {
        var liNode = document.createElement("li");

        var boldNode = document.createElement("bold");
        boldNode.appendChild(document.createTextNode("Total"));

        var totalPrice = 0.00;

        for (var i = 0; i < usersItems.length; i++) {
            totalPrice += usersItems[i].Price;
        }

        var priceNode = document.createElement("span");
        priceNode.setAttribute("class", "item-price");
        priceNode.appendChild(document.createTextNode("€" + totalPrice.toFixed(2)));

        liNode.appendChild(boldNode);
        liNode.appendChild(priceNode);
        return liNode;
    }

}

function placeOrder() {
    sessionStorage.clear();
    displayItems();
}