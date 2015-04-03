$(function(){

  var viewModel = kendo.observable({
    productName:"",
    productQuantity:0,
    productPrice:0.0,
    products: new kendo.data.DataSource({
      transport:{
        read:{
          url: "/products",
          method:"get",
          dataType: "json"
        },
        create:{
          url: "/products",
          method:"post",
          dataType:"json"
        },
        destroy:{
          url:"/products",
          method:"delete",
          dataType:"json"
        },
        update:{
          url:"/products",
          method:"put",
          dataType:"json"
        }
      },
      schema:{
        model:{
          id:"productId",
          fields:{
            price:{
              type:"number"
            },
            quantity:{
              type:"number"
            }
          }
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

      this.set("productName", "");
      this.set("productPrice", 0);
      this.set("productQuantity", 0);

      products.sync();
    },
    total: function() {
      return this.get("products").data().length;
    },
    totalPrice: function() {

      var sum = 0;

      $.each(this.get("products").data(), function(index, product) {
          sum += parseFloat(product.price);
      });

      return sum;
    },
    totalUnits: function() {
      var sum = 0;

      $.each(this.get("products").data(), function(index, product) {
          sum += parseInt(product.quantity);
      });

      return sum;
    },
    onRemoveItem:function(ev){
      if (!confirm("Are you sure?")) {
        ev.preventDefault();
      }
    }
  });

  kendo.bind($(".myView"), viewModel);
})
