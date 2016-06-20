/**
 * Created by Fidelity 2015 on 20/06/2016.
 */
osl.createNamespace("osl.domain");

osl.domain = function () {

    var create = function (success, error, urlPath, data) {
        $.ajax({
            headers: {'Content-Type': 'application/json'},
            url: urlPath,
            success: success,
            data: JSON.stringify(data),
            error: error,
            method: "post",
            async: true
        });
    };

    var retrieve = function (success, error, urlPath) {
        $.ajax({
            headers: {'Content-Type': 'application/json'},
            url: urlPath,
            success: success,
            error: error,
            method: "GET",
            async: true
        });
    };

    var restaurant = function () {

        var urlRoute = "restaurant/";

        var retrieveRestaurants = function (callback, errorCallBack) {
            retrieve(callback, errorCallBack, urlRoute);
        };

        var retrieveRestaurant = function (callback, errorCallBack, id) {
            retrieve(callback, errorCallBack, urlRoute + id);
        };

        var retrieveRestaurantMenu = function (callback, errorCallBack, id) {
            retrieve(callback, errorCallBack, urlRoute + id + "menu");
        };

        return {
            retrieveRestaurant: retrieveRestaurant,
            retrieveRestaurants: retrieveRestaurants,
            retrieveRestaurantMenu: retrieveRestaurantMenu
        }
    }();

    var order = function () {

        var urlRoute = "order/";

        var createOrder = function (callback, errorCallBack, data) {
            create(callback, errorCallBack, urlRoute, data);
        };

        var retrieveOrder = function (callback, errorCallBack, id) {
            retrieve(callback, errorCallBack, urlRoute + id);
        };

        return {
            createOrder: createOrder,
            retrieveOrder: retrieveOrder
        }
    }();

    return {
        order:order,
        restaurant:restaurant
    }
}();