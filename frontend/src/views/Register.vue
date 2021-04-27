<template>
<div class="row login-wrap">
	<div class="login-html">
  <div class="col-md-12">
    <div class="card card-container">
      
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group ">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control formRegister"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control formRegister"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control formRegister"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap{
  margin-top: 30px;
	width: 100%;
  margin-left: auto;
  margin-right: auto;
	max-width:440px;
	min-height:610px;
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
.formRegister,.btn
{
  color:#fff !important;
	display:block !important;
	border:none !important;
	/*padding:15px 20px !important;*/
  border-radius:25px !important;
	background:rgba(255,255,255,.1) !important;
}
label {
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:12px;
}
.btn{
  margin-top: 40px !important;
	background:#1161ee !important;
}
.card-container.card {
  max-width:510px !important;
	min-height:610px !important;
  padding: 40px 40px;
}
.card {
  background-color:transparent  !important;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 35px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.col-md-12{
  padding-left: 0em !important;
  padding-right: 0em !important;
}
.alert {
  padding: 0em !important;
}
</style>