var express = require('express');
var bodyParser = require('body-parser')
var fs = require("fs");
var router = express.Router();
var app = express();
app.use(bodyParser.json());

router.post('/', function (req, res) {
	
	var order = req.body;

	console.log("order="+JSON.stringify(order));
 
	fs.readFile("resources/orders.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		data.push(order);
		fs.writeFile("resources/orders.json", JSON.stringify(data));
			
		var response = {
			status : 201,
			success :'Order Created'
		}

		res.end(JSON.stringify(response));

	});


});

module.exports = router;
