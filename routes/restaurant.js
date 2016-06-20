var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
app.use(bodyParser.json());

router.get('/:id', function (req, res) {
  fs.readFile("resources/" + "restaurants.json", 'utf8', function (err, data) {

    var idOfRestaurant = req.params.id;

    data = JSON.parse(data);

    console.log("you requested restaurant " + idOfRestaurant);

    for (var i = 0; i < data.length; i++) {
      if (data[i].RestaurantDescription.Id == idOfRestaurant) {
        var returnRestaurant = data[i];
      }
    }
    console.log(returnRestaurant);
    res.end(JSON.stringify(returnRestaurant));
  });
});

router.get('/:id/menu', function (req, res) {
  fs.readFile("resources/" + "restaurants.json", 'utf8', function (err, data) {

    var idOfRestaurant = req.params.id;

    data = JSON.parse(data);

    console.log("you requested restaurant " + idOfRestaurant);

    for (var i = 0; i < data.length; i++) {
      if (data[i].RestaurantDescription.Id == idOfRestaurant) {
        var returnRestaurant = data[i].RestaurantMenuCategories;
      }
    }
    console.log(returnRestaurant);
    res.end(JSON.stringify(returnRestaurant));
  });
});

router.get('/', function (req, res) {
  fs.readFile("resources/" + "restaurants.json", 'utf8', function (err, data) {
    var idOfRestaurant = req.params.id;
    data = JSON.parse(data);
    console.log("you requested restaurant " + idOfRestaurant);
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
