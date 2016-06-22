$(function () {

    var restId = location.search.split("restaurant=")[1];

    osl.domain.restaurant.retrieveRestaurant(onGetRestaurantSuccess, onServerError, restId);

    function onServerError(error) {
        alert("error communicating with server: " + error);
    }

    function onGetRestaurantSuccess(data) {

        var menuContainer = document.getElementById("menu-container");
        var restaurant = JSON.parse(data);
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
        itemPrice.appendChild(document.createTextNode(item.Price.toFixed(2)));
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
            " <button class='plus-minus-btns' onclick='adjustCounter(this, -1)'>-</button> <input type='number' value=1 class='item-amount' readonly> <button class='plus-minus-btns' onclick='adjustCounter(this, +1)'>+</button> <button class='default-button'>Add to Cart</button> <a href='#' onclick='closeDetails(this); return false;'>Close</a>"


        return selectAmountObj;
    }

    $("#basket").click(function () {
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
