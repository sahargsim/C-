<template>
  <div class="submit-form row login-wrap">
    <div  class="login-html" v-if="!submitted">
      <h2 class="h2addProd">Add Product</h2>
      <div class="form-group">
        <label for="title" class="labeladdPro">Title</label>
        <input
          type="text"
          class="form-control formaddProd"
          id="title"
          required
          v-model="product.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description" class="labeladdPro">Description</label>
        <input
          class="form-control formaddProd"
          id="description"
          required
          v-model="product.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="price" class="labeladdPro">Price</label>
        <input
          class="form-control formaddProd"
          id="price"
          required
          v-model="product.price"
          name="price"
        />
      </div>
      <div class="form-group">
        <label for="quantity" class="labeladdPro">Qantity</label>
        <input
          class="form-control formaddProd"
          id="quantity"
          required
          v-model="product.quantity"
          name="quantity"
        />
      </div>
      <div class="form-group">
        <label for="category" class="labeladdPro">Category</label>
        <input
          class="form-control formaddProd"
          id="category"
          required
          v-model="product.category"
          name="category"
        />
      </div>
      <div class="form-group">
        <button @click="saveProduct" class="btn btn-primary btn-block btnaddpro">
            <span>Submit</span>
        </button>
      </div>
    </div>

    <div v-else class="addnew">
    <h4 class="h4alert">good news, your product was added successfully !</h4>
      <button @click="newProduct" class="btn btn-primary btn-block btnaddpro">
        <span>Add New Product</span>
      </button>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-Product",
  data() {
    return {
      product: {
        id: null,
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: ""
      },
      submitted: false
    };
  },
  methods: {
    saveProduct() {
      var data = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
        category: this.product.category,

      };

      ProductDataService.create(data)
        .then(response => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>

<style>
.login-wrap{
  margin-top: 50px !important;
	width: 100%;
  margin-left: auto;
  margin-right: auto;
	max-width:440px !important;
	min-height:570px;
	position:relative;
	background:url(https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg) no-repeat center;
	background-size: cover;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding: 20px 20px 20px 20px;
	background:rgba(0,0,0,0.5);
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.formaddProd,.btnaddpro
{
  color:#fff !important;
	display:block !important;
	border:none !important;
  border-radius:25px !important;
	background:rgba(255,255,255,.1) !important;
}
.h2addProd{
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:30px;
  text-align: center;
  letter-spacing: 0.3cm;
  text-transform: uppercase;
}
.labeladdPro {
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:12px;
}
.btnaddpro{
  margin-top: 40px !important;
	background:#1161ee !important;
}
.addnew{
  padding: 20px 20px 20px 20px;
  background:rgba(0,0,0,0.5);
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.addnew .h4alert{
  letter-spacing: 4px;
  width:100%;
  margin-top: 100px;
  color:rgb(15, 196, 120);
	font-size:20px;
  text-align: center;
  text-transform: uppercase;
  padding:25px 0;
}

</style>