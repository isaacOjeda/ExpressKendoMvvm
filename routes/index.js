var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express & Kendo UI' });
});

/* GET Dummy list */
router.get('/products', function(req, res){
  var products = [];

  products.push({
    name: "Product 1",
    price: 232.23,
    quantity: 1
  });

  products.push({
    name: "Product 2",
    price: 10.99,
    quantity: 5
  });

  products.push({
    name: "Product 3",
    price: 50,
    quantity: 2
  })

  res.json(products);
});

module.exports = router;
