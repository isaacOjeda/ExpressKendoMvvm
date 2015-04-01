$(function(){
  var viewModel = kendo.observable({
    productName:"",
    productQuantity:0,
    productPrice:0.0,
    products: new kendo.data.DataSource({
      transport:{
        read:{
          url: "/products",
          dataType: "json"
        }
      }
    }),
    addProduct:function(e){
      var products = this.get("products");
      products.add({
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
      products.remove(product);
    },
    total: function() {
      return this.get("products").data().length;
    },
    totalPrice: function() {
      var sum = 0;

      $.each(this.get("products").data(), function(index, product) {
          sum += product.price;
      });

      return sum;
    },
    totalUnits: function() {
      var sum = 0;

      $.each(this.get("products").data(), function(index, product) {
          sum += product.quantity;
      });

      return sum;
    }
  });

  kendo.bind($(".myView"), viewModel);
})
