$(function(){
  var viewModel = kendo.observable({
    productName:"",
    productQuantity:0,
    productPrice:0.0,
    products: [ ],
    addProduct:function(e){
      var products = this.get("products");
      products.push({
        name: this.get("productName"),
        price: parseFloat(this.get("productPrice")),
        quantity: parseFloat(this.get("productQuantity"))
      });
    },
    removeProduct:function(e){
      // the current data item (product) is passed as the "data"
      // field of the event argument
      var product = e.data;
      var products = this.get("products");
      var index = products.indexOf(product);
      // remove the product by using the splice method
      products.splice(index, 1);
    },
    total: function() {
      return this.get("products").length;
    },
    totalPrice: function() {
      var sum = 0;

      $.each(this.get("products"), function(index, product) {
          sum += product.price;
        });

        return sum;
    },
    totalUnits: function() {
      var sum = 0;

      $.each(this.get("products"), function(index, product) {
          sum += product.quantity;
      });

        return sum;
    }
  });

  kendo.bind($(".myView"), viewModel);
})
