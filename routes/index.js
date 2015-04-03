var express = require('express');
var router = express.Router();


var dummyProducts = [];
var c = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express & Kendo UI' });
});

/* GET static list */
router.get('/products', function(req, res){

  res.json(dummyProducts);
});

/* POST Add new product */
router.post('/products',function(req, res){

  var newProduct = req.body;

  console.log("TODO: Add newProduct to database");
  console.log(newProduct);

  newProduct["productId"] = c++;
  dummyProducts.push(newProduct);

  res.json(newProduct);
});

/* DELETE Delete one product*/
router.delete('/products',function(req,res){
  var deleteProduct = req.body;

  console.log("TODO: Delete this product");
  console.log(deleteProduct);


  var index = dummyProducts.indexOf(deleteProduct);
  dummyProducts.splice(index);

  res.json(deleteProduct);
});

/* PUT Update a product */
router.put('/products',function(req,res){
  var updateProduct = req.body;

  console.log("TODO: Update this product");
  console.log(updateProduct);

  res.json(updateProduct);
})

module.exports = router;
