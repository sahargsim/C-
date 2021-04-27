<template>
<div class="product-wrap">
	<div class="product-html">
  <div class="list">
    <!--Search-->
    <div class="row search">
      <div class="input-group mb-3">
        <input type="text" class="form-control searchForm" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-primary btnsearch" type="button"
            @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>
    <!--Message to click in the product list-->
    <div class="  currentproduct">
      <div v-if="currentProduct" class="listProduct">
        <h2 class="h2listProd">Product</h2>
        <div >
          <label><strong>Title:</strong></label> {{ currentProduct.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentProduct.description }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentProduct.price }}
        </div>
        <div>
          <label><strong>Quantity:</strong></label> {{ currentProduct.quantity }}
        </div>
        <div>
          <label><strong>Category:</strong></label> {{ currentProduct.category }}
        </div>
        <a class="btn btn-warning edit"
          :href="'/products/' + currentProduct.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <h4>Please click on a Product in the List...</h4>
      </div>
    </div>
    <div class="tableproduct">
      <h2 class="h2listProd">Products List</h2>
    <div class="row" style="overflow-x:auto;">
      <table class="table">
      <thead thead-light>
        <tr class="navprod">
          <th scope="col">Title </th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)">
        <tr>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <button class="m-3 btn btn-sm btn-danger delete" @click="removeAllProducts">
      Remove All
    </button>
    </div>
    
  </div>
  </div>
</div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "products-list",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },

    removeAllProducts() {
      ProductDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ProductDataService.findByTitle(this.title)
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style>
.product-wrap{
  margin-top: 80px;
	width: 100%;
  margin-left: auto;
  margin-right: auto;
	max-width:980px;
	min-height:auto !important;
	position:relative;
	background:url(https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg) no-repeat center;
	background-size: cover;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.product-html{
	width:100%;
	height:100%;
  min-height:auto !important;
	position:absolute;
	background:rgba(0,0,0,0.5);
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.search{
  margin-top: 25px;
  margin-left: auto !important;
  margin-right: auto !important;
}
.btnsearch{
  -webkit-border-top-right-radius: 25px;
-webkit-border-bottom-right-radius: 25px;
-moz-border-radius-topright: 25px;
-moz-border-radius-bottomright: 25px;
border-top-right-radius: 25px;
border-bottom-right-radius: 25px;
  /*margin-left: -72px;*/
  background:#1161ee !important;
}
.searchForm
{
  /*color:#fff !important;*/
	display:block !important;
  -webkit-border-top-left-radius: 25px;
-webkit-border-bottom-left-radius: 25px;
-moz-border-radius-topleft: 25px;
-moz-border-radius-bottomleft: 25px;
border-top-left-radius: 25px;
border-bottom-left-radius: 25px;
}
.h2listProd{
  margin-bottom: 30px;
  width:100%;
	display:block;
  color:rgb(78, 76, 76);
	font-size:30px;
  text-align: center;
  letter-spacing: 0.3cm;
  text-transform: uppercase;
}
label {
  width:100%;
	display:block;
  margin-top: 0px;
  color:rgb(78, 76, 76);
	font-size:15px;
  text-align: center;
}
.alert {
  letter-spacing: 2px;
  width:100%;
  color:rgb(78, 76, 76);
	font-size:15px;
  text-align: center;
  text-transform: uppercase;
  padding:10px 0;
}
.tableproduct{
  margin-left: auto !important;
  margin-right: auto !important;
}
.currentproduct{
  margin-right: auto !important;
  margin-left: auto !important;
}
.currentproduct h4{
  letter-spacing: 4px;
  width:100%;
  margin-top: 10px;
  color:rgb(78, 76, 76) !important;
	font-size:20px;
  text-align: center;
  text-transform: uppercase;
  padding:25px 0;
}
.listProduct{
  text-align: center !important;
  margin-top: 20px  !important;
  margin-bottom: 20px  !important;
}
.edit{
  border-radius:25px !important;
  margin-top: 40px !important;
  color:#fff !important;
	
}
.delete{
   border-radius:25px !important;
  color:#fff !important;
}
</style>