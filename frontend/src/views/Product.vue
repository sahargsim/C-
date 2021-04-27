<template>
<div class="row login-wrap">
	<div class="login-html">
  <div v-if="currentProduct" class="edit-form">
    <p class="alert">{{ message }}</p>
    <h2 class="h2Prod">Product</h2>
    <form>
      <div class="form-group">
        <label for="title" class="lebelProd">Title</label>
        <input type="text" class="form-control formProd" id="title"
          v-model="currentProduct.title"
        />
      </div>
      <div class="form-group">
        <label for="description" class="lebelProd">Description</label>
        <input type="text" class="form-control formProd" id="description"
          v-model="currentProduct.description"
        />
      </div>
      <div class="form-group">
        <label for="price" class="lebelProd">Price</label>
        <input type="text" class="form-control formProd" id="price"
          v-model="currentProduct.price"
        />
      </div>
      <div class="form-group">
        <label for="quantity" class="lebelProd">quantity</label>
        <input type="text" class="form-control formProd" id="quantity"
          v-model="currentProduct.quantity"
        />
      </div>
      <div class="form-group">
        <label for="category" class="lebelProd">Category</label>
        <input type="text" class="form-control formProd" id="category"
          v-model="currentProduct.category"
        />
      </div>
    </form>
    <div class="row">
    <div class="form-group">
      <button class="btn btn-danger btnproduct" @click="deleteProduct">
        <span>Delete</span>
      </button>
    </div>
    <div class="form-group">
      <button class="btn btn-success btnproduct" @click="updateProduct">
        <span>Update</span>
      </button>
    </div>
    <div class="form-group">
      <a class="btn btn-primary btnproduct" :href="'/products/'">
        <span>Return</span>
      </a>
    </div>
  </div>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
  </div>
</div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then(response => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then(response => {
          console.log(response.data);
          this.message = 'The Product was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.login-wrap{
  margin-top: 80px;
	width: 100%;
  margin-left: auto;
  margin-right: auto;
	max-width:440px;
	min-height:580px;
	position:relative;
	background:url(https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg) no-repeat center;
	background-size: cover;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	/*padding:0px 10px 10px 0px;*/
	background:rgba(0,0,0,0.5);
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.formProd
{
  color:#fff !important;
	display:block !important;
	border:none !important;
	/*padding:15px 20px !important;*/
  border-radius:25px !important;
	background:rgba(255,255,255,.1) !important;
}
.btnproduct{
  border-radius:25px !important;
  margin-left: 25px;
  margin-right: 0px;
}
.h2Prod{
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:30px;
  text-align: center;
  letter-spacing: 0.3cm;
  text-transform: uppercase;
}
.lebelProd {
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:12px;
}
.alert {
  letter-spacing: 2px;
  width:100%;
  color:rgb(238, 178, 12);
	font-size:15px;
  text-align: center;
  text-transform: uppercase;
  padding:10px 0;
}
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>